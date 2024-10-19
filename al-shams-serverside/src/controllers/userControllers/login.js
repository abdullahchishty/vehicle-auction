const mongoose = require('mongoose')
const User = require('../../models/customerModels/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter email and password" });
        }

        try {

            const user = await User.findOne({email: email });

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const isMatch = user.validPassword(user.salt, password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": user.email,
                        "id": user._id,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            const refreshToken = jwt.sign(
                { "email": user.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            ) 

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({
                _id: user._id,
                email: user.email,
                accessToken
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    },

    logout: async (req, res) => {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(204)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        res.json({ message: 'Cookie cleared' })
    },

    refresh: asyncHandler(async (req, res) => {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const refreshToken = cookies.jwt;
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
                const foundUser = await User.findOne({ email: decoded.email }).exec();
                if (!foundUser) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": foundUser.email,
                            "id": foundUser._id,
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1d' }
                )
                res.json({
                    _id: foundUser._id,
                    email: foundUser.email,
                    accessToken
                })
            }
        );
    })
}
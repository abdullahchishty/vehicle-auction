const mongoose = require('mongoose')
const User = require('../../models/adminModels/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Please enter email and password" });
        }

        try {

            const user = await User.findOne({
                $or: [{ username: username }],
            });

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
                        "username": user.username,
                        "email": user.email,
                        "id": user._id,
                        "role": user.role,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5d' }
            )

            const refreshToken = jwt.sign(
                { "username": user.username },
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
                username: user.username,
                email: user.email,
                role: user.role,
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
        console.log(cookies)
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
                console.log(decoded)
                const foundUser = await User.findOne({ username: decoded.username }).exec();
                if (!foundUser) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": foundUser.username,
                            "email": foundUser.email,
                            "id": foundUser._id,
                            "role": foundUser.role,
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                )
                res.json({
                    _id: foundUser._id,
                    username: foundUser.username,
                    email: foundUser.email,
                    role: foundUser.role,
                    accessToken
                })
            }
        );
    })
}
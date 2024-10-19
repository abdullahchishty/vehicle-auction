const User = require('../../models/customerModels/user');
const nodemailer = require('nodemailer');
const ForgetPassword = require('../../models/customerModels/forgetPassword');
const crypto = require('crypto');
const { generate: uniqueId } = require('shortid');
const bcrypt = require('bcryptjs');
const { url } = require('inspector');

const generateIdHash = (userId) => {
    const currentDateTime = new Date().toISOString();  
    const hashInput = userId.toString() + currentDateTime; 
    const idHash = crypto.createHash('sha256').update(hashInput).digest('hex'); 
    return idHash;
};

module.exports = {
    forgetPassword: async (req, res) => {
        const { email } = req.body;

        try {
            if (!email) {
                return res.status(400).json({ message: "Email field is required" });
              }
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const idHash = generateIdHash(user._id);

            await ForgetPassword.deleteMany({ email: email }); 
            const forgetPassword = new ForgetPassword({
                email: email,
                id: idHash,
            });
            await forgetPassword.save();

            const transporter = nodemailer.createTransport({
                host: 'gator3408.hostgator.com',
                port: 465, 
                secure: true, 
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.PASS,
                }
            });

            forget_password_url=process.env.FORGOT_PASSWORD_URL;

            const verificationLink = `${forget_password_url}${idHash}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Please verify your email',
                text: `Click on the following link to reset password: ${verificationLink}`,
            };

            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error:', error);
                } else {
                    res.status(200).json({
                        message: "Email Sent successfully",
                      })
                }
            });
        } catch (error) {
            console.error('Error in forgetPassword:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    newPasswordSet: async (req, res) => {
        const { password, hash } = req.body;
        try {

            if (!password || !hash) {
                return res.status(400).json({ message: "Password is required." });
            }

            if (password.length < 8) {
                return res.status(400).json({
                    success: false,
                    result: null,
                    message: 'The password needs to be at least 8 characters long.',
                });
            }

            const forgetPasswordRecord = await ForgetPassword.findOne({ id: hash });

            if (!forgetPasswordRecord) {
                return res.status(404).json({ error: "Invalid  password reset link." });
            }

            const email = forgetPasswordRecord.email;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            const salt = uniqueId();
            const passwordHash = bcrypt.hashSync(salt + password, 10);

            const updateResult = await User.updateOne({ email: email }, {
                $set: {
                    password: passwordHash,
                    salt: salt,
                },
            });

            if (updateResult.modifiedCount === 1) {
                await ForgetPassword.deleteOne({ id: hash });

                return res.status(200).json({
                    message: "Password reset successfully.",
                });
            } else {
                return res.status(500).json({
                    error: "Failed to reset password. Please try again later.",
                });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
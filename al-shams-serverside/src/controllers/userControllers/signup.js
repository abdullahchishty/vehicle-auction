const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../../models/customerModels/user');
const VerifyUser = require('../../models/customerModels/verifyUser')
const {generate: uniqueId} = require('shortid')

module.exports = {
  create: async (req, res) => {
    const { email, password,first_name,last_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        result: null,
        message: "Email or password fields are missing.",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An account with this email already exists.',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'The password needs to be at least 8 characters long.',
      });
    }

    const salt = uniqueId();
    const passwordHash = bcrypt.hashSync(salt + password, 10);

    const result = await new User({
      email,
      firstName:first_name,
      lastName:last_name,
      password: passwordHash,
      salt: salt,
      verified: false,
    }).save();

    const transporter = nodemailer.createTransport({
      host: 'gator3408.hostgator.com',
      port: 465, 
      secure: true, 
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.PASS,
      }
    });

    verification_url=process.env.EMAIL_VERIFICATION_URL;

    const randomString = [...Array(40)].map(() => Math.random().toString(36)[2]).join('');

    const createVerifyUser = await new VerifyUser({
        user: result._id,
        hash:randomString
    })

    await createVerifyUser.save();

    const verificationLink = `${verification_url}${randomString}`; 

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Please verify your email',
      text: `Click on the following link to verify your email: ${verificationLink}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          success: false,
          result: null,
          message: "Failed to send verification email.",
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "Customer created and Verification email sent successfully.",
        });
      }
    });
  },

  verifyEmail: async (req, res) => {
    const id = req.query.id;
    const verify = await VerifyUser.find({hash:id});

    if (!verify) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification link.",
      });
    }

    const user = await User.findById(verify[0].user);

    user.verified = true;
    await user.save();

    await VerifyUser.deleteOne({ _id: verify[0]._id });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  },
};
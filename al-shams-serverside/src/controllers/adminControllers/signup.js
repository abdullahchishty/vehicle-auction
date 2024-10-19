const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../../models/adminModels/user');
const { generate: uniqueId } = require('shortid')
const VerifyUser = require('../../models/adminModels/verifyCustomerCreation')
const Customer = require('../../models/customerModels/user')

module.exports = {
  create: async (req, res) => {
    const { email, password, username, role, first_name, last_name } = req.body;

    if (!email || !password || !username || !role) {
      return res.status(400).json({
        success: false,
        result: null,
        message: "Email or password fields are missing.",
      });
    }

    const existingUser = await User.findOne({ username });

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
      username,
      role: role,
      firstName: first_name,
      lastName: last_name,
      password: passwordHash,
      salt: salt,
      verified: false,
    }).save();

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  },
  createCustomer: async (req, res) => {
    const { email, first_name, last_name } = req.body;
    if (!email || !first_name) {
      return res.status(400).json({
        success: false,
        result: null,
        message: "Email or First_name fields are missing.",
      });
    }

    const existingUser = await Customer.findOne({
      $or: [
        { email: email },
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An account with this email already exists.',
      });
    }

    const result = await new Customer({
      email,
      firstName: first_name,
      lastName: last_name,
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

    verification_url = process.env.PASSWORD_CREATION_URL;

    const randomString = [...Array(40)].map(() => Math.random().toString(36)[2]).join('');

    const createVerifyUser = await new VerifyUser({
      user: result._id,
      email: email,
      id: randomString
    })

    await createVerifyUser.save();

    const verificationLink = `${verification_url}${randomString}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Please Set Your Password',
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
};
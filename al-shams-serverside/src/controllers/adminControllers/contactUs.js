const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

module.exports = {
    contactUs: async (req, res) => {
        try {
            const { firstName, lastName, phone, email, message } = req.body;
            if (!firstName || !phone || !email || !message) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const transporter = nodemailer.createTransport({
                host: 'gator3408.hostgator.com',
                port: 465, 
                secure: true, 
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.PASS,
                }
            });
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: 'Inquiry',
                text: `
                    Name: ${firstName} ${lastName}
                    Email: ${email}
                    Phone: ${phone}
                    Message: ${message}
                `,
            };
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Message sent successfully' });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
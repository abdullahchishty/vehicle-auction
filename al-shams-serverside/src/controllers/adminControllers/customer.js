const Customer = require('../../models/customerModels/user');
const VerifyCustomerCreation = require('../../models/adminModels/verifyCustomerCreation')
const ForgetPassword = require('../../models/adminModels/forgetPassword');
const { generate: uniqueId } = require('shortid');
const bcrypt = require('bcryptjs');

module.exports = {
    getCustomers: async (req, res) => {
        try {
            const { id, name } = req.query;
            let customer = await Customer.find();
            if (id) {
                customer = await Customer.findById(id);
                if (!customer) {
                    return res.status(404).json({ message: 'Customer not found' });
                }
                return res.status(200).json([customer]);
            }
            if (name) {
                customer = await Customer.find({
                    $or: [
                        { firstName: { $regex: name, $options: 'i' } }, 
                        { lastName: { $regex: name, $options: 'i' } }
                    ]
                });
                return res.status(200).json(customer);
            }
            return res.status(200).json(customer);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    updateCustomer: async (req, res) => {
        try {
            const { id } = req.query;
            const { first_name, last_name, email} = req.body;
            const customer = await Customer.findById(id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            if (first_name) customer.firstName = first_name;
            if (last_name) customer.lastName = last_name;
            if (email) customer.email = email;
            await customer.save();
            return res.status(200).json([customer]);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            const { id } = req.query;
            const customer = await Customer.findById(id);
    
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
    
            await customer.deleteOne();
            return res.status(200).json({ message: 'Customer deleted successfully' });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
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

            const createPassword = await VerifyCustomerCreation.findOne({ id: hash });

            if (!createPassword) {
                return res.status(404).json({ error: "Invalid  password reset link." });
            }

            const email = createPassword.email;

            const user = await Customer.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: "Customer not found." });
            }

            const salt = uniqueId();
            const passwordHash = bcrypt.hashSync(salt + password, 10);

            const updateResult = await Customer.updateOne({ email: email }, {
                $set: {
                    password: passwordHash,
                    salt: salt,
                    verified: true
                },
            });
            if (updateResult.modifiedCount === 1) {
                await VerifyCustomerCreation.deleteOne({ id: hash });

                return res.status(200).json({
                    message: "Password set successfully.",
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

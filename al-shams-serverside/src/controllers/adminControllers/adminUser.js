const User = require('../../models/adminModels/user')
const bcrypt = require('bcryptjs');

module.exports = {
    getUser: async (req, res) => {
        try {
            const { id, name } = req.query;
            let user = await User.find();
            if (id) {
                user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json([user]);
            }
            if (name) {
                user = await User.find({
                    $or: [
                        { firstName: { $regex: name, $options: 'i' } }, 
                        { lastName: { $regex: name, $options: 'i' } }
                    ]
                });
                return res.status(200).json(user);
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.query;
            const { first_name, last_name, email, username, password,role } = req.body;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (username) {
                const existingUser = await User.findOne({ username, _id: { $ne: id } });
                if (existingUser) {
                    return res.status(400).json({ message: 'Username already exists' });
                }
                user.username = username;
            }
            if (password) {
                const salt = user.salt; 
                const hashedPassword = bcrypt.hashSync(salt + password, 10);
                user.password = hashedPassword;
            }
            if (first_name) user.firstName = first_name;
            if (last_name) user.lastName = last_name;
            if (role) user.role = role;
            if (email) user.email = email;
            await user.save();
            return res.status(200).json([user]);
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.query;
            const user = await User.findById(id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            await user.deleteOne();
            return res.status(200).json({ message: 'User deleted successfully' });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },    
};

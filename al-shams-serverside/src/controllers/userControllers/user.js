const User = require('../../models/customerModels/user');
const bcrypt = require('bcrypt');

module.exports = {
    getUser: async (req, res) => {
        try {
            const { id } = req.query;
            const tokenUserId = req.auth.UserInfo.id;
            if (!id) {
                return res.status(404).json({ message: "Please Provide Id" });
            }
            if (id !== tokenUserId) {
                return res.status(403).json({ message: "Forbidden: You are not authorized to access this user's details" });
            }

            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json([user]);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.query;
            const { first_name, last_name, email, password, new_password } = req.body;
            const tokenUserId = req.auth.UserInfo.id;
            if (id !== tokenUserId) {
                return res.status(403).json({ message: "Forbidden: You are not authorized to update this user's details" });
            }
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (password && new_password) {
                const isMatch = bcrypt.compareSync(user.salt + password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Current password is incorrect' });
                }
                const salt = user.salt; 
                const hashedPassword = bcrypt.hashSync(salt + new_password, 10);
                user.password = hashedPassword; 
            }
            if (first_name) user.firstName = first_name;
            if (last_name) user.lastName = last_name;
            if (email) user.email = email;
            await user.save();
            return res.status(200).json([user]);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

const User = require('../../models/adminModels/user');

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
            const { first_name, last_name, email,username } = req.body;
            const tokenUserId = req.auth.UserInfo.id;
            if (id !== tokenUserId) {
                return res.status(403).json({ message: "Forbidden: You are not authorized to update this user's details" });
            }
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

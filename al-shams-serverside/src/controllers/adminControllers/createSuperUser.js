const mongoose = require("mongoose");
const User = require("../../models/adminModels/user");
const Config = require("../../models/adminModels/configSchema");
const bcrypt = require("bcrypt");
const { generate: uniqueId } = require('shortid');

module.exports = {
    createSuperUser: async (req = {}, res = null) => {
        try {
            const config = await Config.findOne({});
            if (config && config.check) {
                if (res) {
                    return res.status(400).json({
                        success: false,
                    });
                } else {
                    return;
                }
            }
            let email = process.env.ADMIN_EMAIL;
            let password = process.env.ADMIN_PASSWORD;
            let username = process.env.ADMIN_USERNAME;
            if (!email || !password || !username) {
                if (res) {
                    return res.status(400).json({
                        success: false,
                        message: "Admin credentials (email, password, username) are not set in environment variables.",
                    });
                } else {
                    console.error("Admin credentials are missing in environment variables.");
                    return;
                }
            }

            const user = await User.findOne({ username });
            if (user) {
                if (res) {
                    return res.status(400).json({
                        success: false,
                        message: "Super Admin with this username already exists.",
                    });
                } else {
                    return ;
                }
            }

            const salt = uniqueId();
            const passwordHash = await bcrypt.hash(salt + password, 10); 

            await new User({
                email,
                username,
                role: "admin",
                password: passwordHash,
                salt: salt,
                verified: false,
            }).save();


            if (!config) {
                await new Config({ check: true }).save();
            } else {
                config.check = true;
                await config.save();
            }

            if (res) {
                return res.status(201).json({
                    success: true,
                });
            } else {
                console.log("Super Admin created successfully.");
                return;
            }

        } catch (error) {
            console.error("Error creating Super Admin:", error);
            if (res) {
                return res.status(500).json({
                    success: false,
                    message: "Server error",
                });
            } else {
                return;
            }
        }
    }
}

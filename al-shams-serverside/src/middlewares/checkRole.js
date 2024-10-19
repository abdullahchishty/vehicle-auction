const admin = require("../models/adminModels/user");
const jwt = require("jsonwebtoken");

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden, invalid token" });
        }
        req.auth = user;
        const userId = req.auth.UserInfo.id;

        if (!userId) {
          return res.status(401).json({ message: "Unauthorized, invalid user ID" });
        }
        const userRole = await admin.findOne({ _id: userId });
        if (!userRole) {
          return res.status(404).json({ message: "User not found" });
        }
        if (!roles.includes(userRole.role)) {
          return res.status(403).json({ message: "You don't have permission to access this resource" });
        }
        next();
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = checkRole;

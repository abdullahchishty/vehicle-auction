const express = require('express');
const router = express.Router();
const multer = require('multer');

const categoryUploadMiddleware = require('../../middlewares/categoryUploadMiddleware');

const authenticateJWT = require('../../middlewares/authenticateJWT');
const category = require('../../controllers/categoryControllers/category');
const checkRole = require('../../middlewares/checkRole');

router.post(
    '/create',
    authenticateJWT,
    checkRole(['admin']),
    (req, res, next) => {
        categoryUploadMiddleware.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    category.addCategory
);

router.post(
    '/update',
    authenticateJWT, 
    checkRole(['admin']),
    (req, res, next) => {
        categoryUploadMiddleware.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    category.updateCategory
);


module.exports = router
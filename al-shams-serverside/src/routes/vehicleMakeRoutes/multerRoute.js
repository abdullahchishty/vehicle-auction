const express = require('express');
const router = express.Router();
const multer = require('multer');

const makeLogoUpload = require('../../middlewares/makeLogoUploadMiddleware');

const authenticateJWT = require('../../middlewares/authenticateJWT');
const makes = require('../../controllers/vehicleMakeControllers/vehicleMake');
const checkRole = require('../../middlewares/checkRole');

router.post(
    '/make/add',
    authenticateJWT,
    checkRole(['admin']),
    (req, res, next) => {
        makeLogoUpload.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    makes.addMake
);

router.post(
    '/make/update',
    authenticateJWT, 
    checkRole(['admin']),
    (req, res, next) => {
        makeLogoUpload.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    makes.updateMake
);


module.exports = router
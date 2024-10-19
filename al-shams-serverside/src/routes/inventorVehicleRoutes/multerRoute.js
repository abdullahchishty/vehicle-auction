const express = require('express');
const router = express.Router();
const multer = require('multer');

const vehicleUploadMiddleware = require('../../middlewares/vehicleUploadMiddleware');

const authenticateJWT = require('../../middlewares/authenticateJWT');
const vehicleInventory = require('../../controllers/inventoryVehicleControllers/inventoryVehicle');
const checkRole = require('../../middlewares/checkRole');

router.post(
    '/add',
    authenticateJWT,
    checkRole(['admin']),
    (req, res, next) => {
        vehicleUploadMiddleware.fields([
            { name: 'IMAGES', maxCount: 10 },
            { name: 'AUCTION_SHEET', maxCount: 1 }
        ])(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    vehicleInventory.addVehicle
);

router.post(
    '/update',
    authenticateJWT,
    checkRole(['admin']),
    (req, res, next) => {
        vehicleUploadMiddleware.fields([
            { name: 'IMAGES', maxCount: 10 },
            { name: 'AUCTION_SHEET', maxCount: 1 }
        ])(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    vehicleInventory.updateVehicle
);


module.exports = router
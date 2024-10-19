const express= require('express');
const router = express.Router();

const authenticateJWT = require('../../middlewares/authenticateJWT');
const features = require('../../controllers/inventoryVehicleControllers/vehicleFeatures');
const vehicleInventory = require('../../controllers/inventoryVehicleControllers/inventoryVehicle');
const checkRole = require('../../middlewares/checkRole');

router.get("/feature/get",authenticateJWT,checkRole(['admin']),features.getFeature);
router.delete('/feature/delete',authenticateJWT,checkRole(['admin']),features.deleteFeature);
router.post('/feature/add',authenticateJWT,checkRole(['admin']),features.addFeature);
router.post('/feature/update',authenticateJWT,checkRole(['admin']),features.updateFeature);

router.get('/get',vehicleInventory.getVehicleFromDatabase);
router.get('/auction/get',authenticateJWT,vehicleInventory.getVehicleFromExternalAPI);
router.delete('/delete',authenticateJWT,checkRole(['admin']),vehicleInventory.deleteVehicle);

module.exports = router
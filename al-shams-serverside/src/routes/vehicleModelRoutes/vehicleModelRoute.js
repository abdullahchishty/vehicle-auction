const express= require('express');
const router = express.Router();

const authenticateJWT = require('../../middlewares/authenticateJWT');
const models = require('../../controllers/vehicleModelControllers/vehicleModel');
const checkRole = require('../../middlewares/checkRole');

router.get("/model/get",authenticateJWT,checkRole(['admin']),models.getModel);
router.post('/model/add',authenticateJWT,checkRole(['admin']),models.addModel);
router.post('/model/update',authenticateJWT,checkRole(['admin']),models.updateModel);

module.exports = router
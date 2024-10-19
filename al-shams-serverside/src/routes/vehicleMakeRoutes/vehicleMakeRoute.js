const express= require('express');
const router = express.Router();

const authenticateJWT = require('../../middlewares/authenticateJWT');
const makes = require('../../controllers/vehicleMakeControllers/vehicleMake');
const checkRole = require('../../middlewares/checkRole');

router.get("/make/get",authenticateJWT,checkRole(['admin']),makes.getMake);
router.delete('/make/delete',authenticateJWT,checkRole(['admin']),makes.deleteMake);

module.exports = router
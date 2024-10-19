const express= require('express');
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({extended:true}))

const authenticateJWT = require('../../middlewares/authenticateJWT');
const attribute = require('../../controllers/vehicleAttributeControllers/vehicleAttribute');
const checkRole = require('../../middlewares/checkRole');

router.post('/attribute/add',authenticateJWT,checkRole(['admin']),attribute.addAttribute);
router.get('/attribute/get',authenticateJWT,checkRole(['admin']),attribute.getAttributes);
router.put('/attribute/update',authenticateJWT,checkRole(['admin']),attribute.updateAttribute);
router.delete('/attribute/delete',authenticateJWT,checkRole(['admin']),attribute.deleteAttribute);

module.exports = router
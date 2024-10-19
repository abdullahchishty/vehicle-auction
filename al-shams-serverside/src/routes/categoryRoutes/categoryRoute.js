const express= require('express');
const router = express.Router();

const authenticateJWT = require('../../middlewares/authenticateJWT');
const category = require('../../controllers/categoryControllers/category');
const checkRole = require('../../middlewares/checkRole');

router.get("/get",category.getCategory);
router.delete('/delete',authenticateJWT,checkRole(['admin']),category.deleteCategory);

module.exports = router
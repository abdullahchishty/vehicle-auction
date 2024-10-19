const express= require('express');
const router = express.Router();
const authenticateJWT = require('../../middlewares/authenticateJWT');

const signup = require('../../controllers/adminControllers/signup');
const login = require('../../controllers/adminControllers/login')
const forgetPassword = require('../../controllers/adminControllers/forgetPassword')
const checkRole = require('../../middlewares/checkRole');
const customer = require('../../controllers/adminControllers/customer');
const adminUser = require('../../controllers/adminControllers/adminUser');
const user = require('../../controllers/adminControllers/user');
const contactUs = require('../../controllers/adminControllers/contactUs');

router.post("/register",authenticateJWT,checkRole(['admin']),signup.create);
router.post("/login",login.login);
router.get("/refresh",login.refresh);
router.post("/logout",login.logout);
router.post("/resetPassword",forgetPassword.newPasswordSet);
router.post('/forgetPassword', forgetPassword.forgetPassword);
router.post('/create/customer',authenticateJWT,checkRole(['admin']),signup.createCustomer);
router.post('/password/set',customer.newPasswordSet);
router.get('/customerList',authenticateJWT,checkRole(['admin']),customer.getCustomers);
router.post('/updateCustomer',authenticateJWT,checkRole(['admin']),customer.updateCustomer);
router.delete('/deleteCustomer',authenticateJWT,checkRole(['admin']),customer.deleteCustomer);

router.get('/getAdminUser',authenticateJWT,checkRole(['admin']),adminUser.getUser);
router.post('/updateAdminUser',authenticateJWT,checkRole(['admin']),adminUser.updateUser);
router.delete('/deleteAdminUser',authenticateJWT,checkRole(['admin']),adminUser.deleteUser);

router.get('/detail',authenticateJWT,user.getUser);
router.post('/update',authenticateJWT,user.updateUser);

router.post('/contactUs',contactUs.contactUs);

module.exports = router
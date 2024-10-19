const express= require('express');
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({extended:true}))
const authenticateJWT = require('../../middlewares/authenticateJWT');

const signup = require('../../controllers/userControllers/signup');
const login = require('../../controllers/userControllers/login')
const forgetPassword = require('../../controllers/userControllers/forgetPassword')
const user = require('../../controllers/userControllers/user');

router.post("/register",signup.create);
router.get("/verify", signup.verifyEmail);
router.post("/login",login.login);
router.get("/refresh",login.refresh);
router.post("/logout",login.logout);
router.post("/resetPassword",forgetPassword.newPasswordSet);
router.post('/forgetPassword', forgetPassword.forgetPassword);
router.get('/getUser',authenticateJWT,user.getUser);
router.post('/updateUser',authenticateJWT,user.updateUser);

module.exports = router
const express = require('express');
const { loginController, registerController, authController } = require('../controllers/UserCtrl');
const authMiddle = require('../middlewares/authMiddle');


//router object
const router =express.Router();

//routes
//login post
router.post("/login",loginController)

//register post
router.post("/register",registerController)


//Authentication post
router.post("/getUserdata",authMiddle, authController)
module.exports = router;
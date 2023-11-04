const express = require('express');
const { loginController, getAllDoctorsController,registerController, authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController } = require('../controllers/UserCtrl');
const authMiddle = require('../middlewares/authMiddle');


//router object
const router =express.Router();

//routes
//login post
router.post("/login",loginController)

//register post
router.post("/register",registerController)


//Authentication post
router.post("/getUserData",authMiddle, authController)
//apply doctor post
router.post("/apply-doctor",authMiddle, applyDoctorController)
//notification doctor post
router.post("/get-all-notification",authMiddle, getAllNotificationController)
//delete notification
router.post("/delete-all-notification",authMiddle, deleteAllNotificationController)
// get alll doctor
router.get('/getAllDoctors',authMiddle,getAllDoctorsController)
module.exports = router;

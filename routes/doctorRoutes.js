const express =require('express')
const {getDoctorInfoController,updateProfileController, getDoctorByIdController}=require('../controllers/doctorCtrl')
const authMiddle= require('../middlewares/authMiddle')
const router =express.Router()
//GET SINGLE DOC INFO
router.post('/getDoctorInfo',authMiddle,getDoctorInfoController)
router.post('/updateProfile',authMiddle,updateProfileController)
router.post('/getDoctorById',authMiddle,getDoctorByIdController)
module.exports = router
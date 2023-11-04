
const doctorModel=require('../models/docterModels')
const getDoctorInfoController= async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'doctor data fetch success',
            data:doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in Fetching Doctor Details'
        })
    }
}
const updateProfileController = async (req,res)=>{
    try {
        const doctor=await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
        res.status(201).send({
            success:true,
            message:'Doctor Profile updated',
            data:doctor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Doctor Profile update issue',
            error,
        })
    }
}
const getDoctorByIdController = async (req,res)=>{
    try {
        const doctor= await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message:'Single Doctor Info get successfully',
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error getting Single Doctor Info',
            error
        })
    }
}
module.exports={getDoctorInfoController,updateProfileController,getDoctorByIdController};
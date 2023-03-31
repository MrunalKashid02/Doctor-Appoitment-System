const UserModel= require('../models/userModels')
const bcrypt =require('bcryptjs');
const { request } = require('express');


const registerController = async (req,res) => {
    try {
        const existingUser = await UserModel.findOne({email: req.body.email});
        if(existingUser){
            return res.status(200).send({message:`User Already Register`,success:false});
        }
        const password= req.body.password;
        const salt= await bcrypt.genSalt(10);       
        const hashedPassword= await bcrypt.hash(password, salt);
        req.body.password=hashedPassword;
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).send({message:"Register Successfully",success:true});


    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message: `Register controller ${error.message}`,});
    }
};


const loginController = () => {}



module.exports= {loginController,registerController};
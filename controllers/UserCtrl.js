const UserModel= require('../models/userModels')
const bcrypt =require('bcryptjs');
const { request } = require('express');
const jwt= require('jsonwebtoken');


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
        res.status(500).send({success:false,message: `Register controller ${error.message}`});
    }
};

//login callback
const loginController = async (req,res) => {
    try {
        const user = await UserModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({message: 'User not found', success:false});
        }
        const isMatch= await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({message: 'Invalid Email or Password',success:false});
        }
        const token =jwt.sign({id:user._id},process.env.JWT_TKN, {expiresIn: '1d'});
        res.status(200).send({message: "Login Successfully",success:true,token});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error in Login CTRL ${error.message}`})
    }
}

const authController = async (req,res)=>{
    try {
        const user = await UserModel.findOne({_id:req.body.userId})
        if(!user){
            res.status(200).send({
                message: 'user not found',
                success:false
            })
        }
        else{
            res.status(200).send({
                success:true,
                data :{
                    name:user.name,
                    email:user.email,
                },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Authentication error',
            success:false,
            error
        })
    }
}


module.exports= {loginController,registerController,authController};
require('dotenv').config()
const express = require("express");
const router =  express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { sendWelcomeEmail } = require('../emails/account')
const {auth} = require('../../../middleware/auth')
const sendResetPasswordEmail = require('../emails/resetPassword');


// User sign Up 
let UserSignUp = async (req,res)=>{
    const user = new User(req.body)
    try{
     await user.save();
     sendWelcomeEmail(user.email,user.name)
    const token =  await user.generateAuthToken()
     res.status(201).send({user , token });
    }
    catch (e){
        res.status(400).send(e)
    }
}

// User sign In 
let UserSignIn = async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password)
        console.log(user)

        const token = await user.generateAuthToken()
        console.log(token)
        res.status(201).send({user,token})
    }
    catch(e){
        console.log(`error${e}`)
        res.status(404).send(`${e}`)
    }
}

// User Forget Password 
let UserForgetPassword = async(req,res)=>{
    let email = req.body
    var token =  jwt.sign({email},process.env.JWT_SECRET)
    //var token = await User.generateAuthToken()
    sendResetPasswordEmail(email,token)

}
// User Reset Password 
let UserResetPassword = async(req,res)=>{
    var token = req.query.token 
    if (!token){
        res.status(404).send({message:" token not found "})
    }
    var  verifyToken = jwt.verify(token,process.env.JWT_SECRET)
    if(verifyToken){
        const updates = Object.keys(req.body)
        const allowedUpdates = [ 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
    
        try {
            updates.forEach((update)=> req.user[update] = req.body[update])
            await req.user.save()
       
        res.send(req.user)
        } catch (e) {
            res.status(400).send(e)
        }
    }
    res.status(404).send({message:"token not verified "})
}

// User Update Info 

let UserUpdateInfo = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()
   
    res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}

// Deleting User 
let UserDelete = async (req,res) =>{
    try{
       // const id = req.user._id;
      // const user =  await User.findByIdAndDelete(req.params._id)
       // res.status(200).send({message: user})

       await req.user.remove()
       res.send(req.user)
    }
    catch(e){
        console.log(e)
        res.status(500).send()}
}

module.exports= {
    UserSignUp,
    UserSignIn,
    UserForgetPassword,
    UserResetPassword,
    UserUpdateInfo,
    UserDelete

}
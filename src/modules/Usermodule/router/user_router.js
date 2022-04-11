require('dotenv').config()
const express = require("express");
const router =  express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { sendWelcomeEmail } = require('../emails/account')
const {auth} = require('../../../middleware/auth')

const sendResetPasswordEmail = require('../emails/resetPassword');
const   { UserSignUp,
UserSignIn,
UserForgetPassword,
UserResetPassword,
UserUpdateInfo,
UserDelete } = require('../controller/user.controller')
require('dotenv').config()
//Create User (Sign Up)
router.post('/user/signup',async(req,res)=>{
    UserSignUp(req,res);
})

// read profile 
router.get('/user/me',auth,async(req,res)=>{
    res.send(req.user);
 })
// Sign In 
router.post('/user/signIn',async (req,res)=>{
    UserSignIn(req,res);
})

// forget password 

router.put('/user/forgetPassword',auth , async(req, res) => {
    UserForgetPassword(req,res);
    }); 
// reset password 
router.put ('/user/resetPassword',auth, async(req,res)=>{
    UserResetPassword(req,res);
})

// welcome 
router.get("/welcome", auth, (req, res) => {
    res.status(200).send(req.user);
  });
// Updating user (name ,email, password)
router.patch('/user/update',auth, async(req,res)=>{
    UserUpdateInfo(req,res);

})
//Deleting User 
router.delete('/user/:id' , auth,async (req,res,next)=>{
    UserDelete(req,res)
    })
module.exports = router
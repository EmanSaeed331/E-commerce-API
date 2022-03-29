require('dotenv').config()
const express = require("express");
const router =  express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { sendWelcomeEmail } = require('../emails/account')
const auth = require('../../../middleware/auth')

const sendResetPasswordEmail = require('../emails/resetPassword');
const res = require('express/lib/response');
require('dotenv').config()
//Create User (Sign Up)
router.post('/signup',async(req,res)=>{
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
})

// read profile 
router.get('/user/me',auth,async(req,res)=>{
    res.send(req.user)
 })
// Sign In 
router.post('/signIn',async (req,res)=>{
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
})

// forget password 

router.put('/user/forgetPassword',auth , async(req, res) => {
    let email = req.body
    var token =  jwt.sign({email},process.env.JWT_SECRET)
    //var token = await User.generateAuthToken()
    sendResetPasswordEmail(email,token)
    }); 
    res.send({message:"email send"})
// reset password 
router.put ('/user/resetPassword',auth, async(req,res)=>{
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
    

    
})

router.get("/welcome", auth, (req, res) => {
    res.status(200).send(req.user);
  });
// Updating user (name ,email, password)
router.patch('/user/update',auth, async(req,res)=>{
 
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
})


//Deleting User 
router.delete('/user/:id' , async (req,res,next)=>{
    try{
        const id = req.params._id;
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
        next()
    }
    catch(e){
        res.status(500).send()}
    })
module.exports = router
const express = require("express");
const router =  express.Router()
const User = require('../models/userModel')
const { sendWelcomeEmail } = require('../emails/account')

//Create User (Sign Up)
router.post('/signup',async(req,res)=>{
    const user = new User(req.body)
    const result = await user.save()
    const token = await user.generateAuthToken()
    if(! result ){
        res.json({
            status:"Failed",
            message:"User not register successfully"
        })
        
    }
    else {
        res.status(201).send({user , token})
    }
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
    catch (e){
        console.log(`error${ e}`)
        res.status(400).send({error:e})
    }
})
module.exports = router
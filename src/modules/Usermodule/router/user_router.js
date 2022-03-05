const express = require("express");
const router =  express.Router()
const User = require('../models/userModel')

/* const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/E-commerce') */

//Create User (Sign Up)
router.post('/signup',async (req,res)=>{
    console.log(req.body)
   const user = new User(req.body)
   const result = await user.save()
    if(! result ){
        res.json({
            status:"Faild",
            message:"User not register successfully"
        })
        
    }
    else {
        res.status(201).send(req.body)
    }
})
// Sign In 
router.post('/signIn',(req,res)=>{
    try{res.status(201).send({
            'SignIn':true,
            'user':'Eman',
            'Age':'25'
        })
    }
    catch(e){
        res.status.send({error:e})
    }
})
module.exports = router
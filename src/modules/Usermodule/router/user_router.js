const express = require("express");
const router =  express.Router()
const User = require('../models/userModel')
const { sendWelcomeEmail } = require('../emails/account')
const auth = require('../../../middleware/auth')
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
    // Validate input user
    if (!(user.email && user.password && user.phone))
        {req.status(400).send("All inputs are required")}
    // Validate user  existence 
     const existenceUser = await User.findOne({'user.email':user.email})
    if (existenceUser){
        return res.status(409).send({'error':'user is exist'})
    } 

    else {
        console.log(` {useremail:${user.email} , userName:${user.name}}`)
        sendWelcomeEmail(user.email , user.name)
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
    catch(e){
        console.log(`error${e}`)
        res.status(404).send(`${e}`)
    }
})
router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
// Updating user (name ,email, password)
router.patch('/user/update',auth, async(req,res)=>{
    var user = new User(req.body)

        const updates = Object.keys(req.body)

        const allowedUpdates = ['name', 'email', 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        try {
            updates.forEach((update)=> req.user[update] = req.body[update])
            await user.save()
            res.send(req.user)
     }
    catch(e){
        console.log(e.message);
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
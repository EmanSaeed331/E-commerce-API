const jwt = require('jsonwebtoken')
const User = require('../modules/Usermodule/models/userModel')
const auth = async(req,res,next) =>{
    try{
   // const token = req.header('authorization').replace('Bearer','')
   const token =req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
    const decoded = jwt.verify(token,'PrivateToken')
    const user = await User.findOne({id:decoded._id,'tokens.token':token})
    if(!user){
        console.log('ERROR')   
    }
    req.token = token
    req.user = decoded

    }
    catch(e){
        console.log(e)
        res.status(404).send({error:e})
    }
     return next()
}
module.exports=auth
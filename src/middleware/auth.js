const jwt = require('jsonwebtoken')
const User = require('../modules/Usermodule/models/userModel')
const auth = async(req,res,next) =>{
    try{
    const token = req.header('Authorization').replace('Bearer','')
    const decode = jwt.verify(token,'PrivateToken')
    const user = await User.findOne({id:decode._id,'tokens.token':token})

    if(!user){
        throw new Error()
    }
    req.token = token
    req.user = user
    next()
    }
    catch(e){
        console.log(e)
        res.status(404).send({error:e})
    }
}
module.exports=auth
const jwt = require('jsonwebtoken')
const User = require('../modules/Usermodule/models/userModel')
const Admin = require('../modules/adminModule/model/model.admin')
// User Auth 
const auth = async(req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:decoded._id , 'tokens.token':token})
        // validate user existence .
        if (!user){
            throw new Error ()
        }
        req.token = token 
        req.user = user 

       next()

    }
    catch(e){
        res.status(401).send({error :'Please authenticate. '})
        console.log("error"+ e)
    }    
}

// Admin Auth 
const AdminAuth = async(req,res,next) =>{
    try{
        const token = req.header('Admin-Authorization').replace('Bearer ','')
    
        const decoded = jwt.verify(token,process.env.JWT_ADMIN_SECERT)
        const admin = await Admin.findOne({_id:decoded._id , 'tokens.token':token})
        // validate user existence .
        if (!admin){
            throw new Error ()
        }
        req.token = token 
        req.admin = admin 

       next()

    }
    catch(e){
        res.status(401).send({error :'Please authenticate. '})
        console.log("error"+ e)
    }    
}

module.exports={auth,AdminAuth}
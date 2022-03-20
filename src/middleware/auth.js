const jwt = require('jsonwebtoken')
const User = require('../modules/Usermodule/models/userModel')
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

module.exports=auth
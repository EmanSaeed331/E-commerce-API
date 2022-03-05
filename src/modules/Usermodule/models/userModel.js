const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true,
        default:'Test'
    },
    email:{
        type:String,
        require:true,
        default:'Test@gmail.com'

    },
    age:{
        type:Number,
        default :0
    },
    password:{
        type:String,
        require:true,
        default : 'Password '
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
})
userSchema.methods.toJSON = function(){
    const User = this
    const userObject = User.toObject()
    return userObject
}
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'PrivateToken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = new mongoose.model('User',userSchema);
module.exports = User
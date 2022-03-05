const mongoose = require('mongoose')
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
    }
})
userSchema.methods.toJSON = function(){
    const User = this
    const userObject = User.toObject()
    return userObject
}
const User = new mongoose.model('User',userSchema);
module.exports = User
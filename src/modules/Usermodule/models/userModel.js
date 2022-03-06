const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true,
        default:'Test'
    },
    email:{
        type:String,
        require:true,
        default:'Test@gmail.com',
        unique:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ('Email is not vald')
            }
        }
    },
    age:{
        type:Number,
        default :0,
        validate(value){
            if(value <0){
                throw new Error ('Age must be positive')
            }
        }
    },
    password:{
        type:String,
        require:true,
        validate(value){
            if (value.length <6){
                throw new Error ('Password must be greater than 6 letters ')
            }
        }
    },
    phone:{
        type:Number,
        require:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'PrivateToken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email , password)=>{
    const user = await User.findOne({email})
    if (!user){
        throw new Error ('Unable to Login')
    }
     console.log(`user.password+${user.password}`)
    console.log(`password+${password}`)

    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch){
        throw new Error ('password is not correct')
    } 
    return user 
}
userSchema.methods.toJSON = function(){
    const User = this
    const userObject = User.toObject()
    return userObject
}
userSchema.pre("save",async function (next){
    const user = this 
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8);
    }
    next()
})
const User = new mongoose.model('User',userSchema);
module.exports = User
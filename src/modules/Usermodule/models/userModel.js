const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String ,
        unique:true,
        require: true,
        trim:true,
        lowerCase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value <0){
                throw new Error('Age must be a positive number')
            }

        }
    },
    password:{
        type:String , 
        require : true , 
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    tokens:[{
        token:{
            type:String, 
            required:true,
        }
    }] ,
    avatar:{
        type:Buffer,

    }

},
    
    {timestamps:true
    },
)



userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error ('Unable to Login')
    }
    console.log(`password${password}`)
    console.log(`user.password${user.password}`)
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error ('Unable to Login')
    }
    return user 
}

userSchema.methods.toJSON = function (){
    const user = this  
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject

}
//encrypt the password 
userSchema.pre("save",async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.pre('remove',async function (next) {
    const user = this
    Task.deleteMany({owner:user._id})

    next()
})
const User = new mongoose.model('User',userSchema);
module.exports = User
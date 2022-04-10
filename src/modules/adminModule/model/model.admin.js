const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
    },
    lastname :{
        type:String, 
        require:true,
        trim:true
    },
    email:{
        type:String ,
      
        default :'EmanSaeed5330@gmail.com',
        trim:true,
     
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
    })


    adminSchema.methods.generateAuthToken = async function(){
        const admin = this
        const token = jwt.sign({_id:admin._id.toString()},process.env.JWT_ADMIN_SECERT)
        admin.tokens = admin.tokens.concat({token})
        await admin.save()
        return token
    }
    adminSchema.statics.findByCredentials = async (email, password)=>{
        const admin = await admin.findOne({email})
        if(!admin) {
            throw new Error ('Unable to Login')
        }
        console.log(`password${password}`)
        console.log(`user.password${admin.password}`)
        const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch){
            throw new Error ('Unable to Login')
        }
        return user 
    }
    
    adminSchema.methods.toJSON = function (){
        const admin = this  
        const adminObject = admin.toObject()
        delete adminObject.password
        delete adminObject.tokens
        return adminObject
    
    }
    //encrypt the password 
    adminSchema.pre("save",async function(next){
        const admin = this
        if(admin.isModified('password')){
            admin.password = await bcrypt.hash(admin.password,8)
        }
        next()
    })
    
  


const admin = new mongoose.model('admin',adminSchema);
module.exports = admin
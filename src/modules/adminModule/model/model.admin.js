const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
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
    Users:{
        type:Number
    },
    Categories:{
        type:Number
    },
    Products:{
        type:Number
    }
    
},
)

const Admin = new mongoose.model('Admin',adminSchema);
module.exports = Admin
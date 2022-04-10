const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
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
   type:Number
    }

)

const admin = new mongoose.model('Admin',adminSchema);
module.exports = admin
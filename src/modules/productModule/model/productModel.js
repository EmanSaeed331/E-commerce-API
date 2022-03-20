const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
   
    productName:{     
            type:string,
            required:true,
        },
    productDescription:{ 
        type:string,
        required:true,
    },
    productPrice:{
        type:number,
        required:true
    }
    
})
const product = new mongoose.model('Product',productSchema)
module.exports = product
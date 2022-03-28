const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
   
    productName:{     
            type:String,
            required:true,
        },
    productDescription:{ 
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true
    }, 
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'category'
    }
    
})
productSchema.virtual('reviews', {
    ref:'Review',
    localField:'_id',
    foreignField:'product'

})
const product = new mongoose.model('Product',productSchema)
module.exports = product
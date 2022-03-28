const mongoose = require('mongoose')
var product = require('../../productModule/model/productModel')
var categorySchema = new mongoose.Schema({
    categoryName:{
        type:String , 
        required:true
    },
    categoryDescription:{
        type:String , 
        required:true 
    },
    products:[{
        type:String , 
    }]

  
})
/* categorySchema.virtual('products',{
    ref:'Product',
    localField:'_id',
    foreignField:'category'
}) */
var categoryModel = new mongoose.model('category',categorySchema)
module.exports = categoryModel
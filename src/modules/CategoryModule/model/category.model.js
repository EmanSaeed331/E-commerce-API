const mongoose = require('mongoose') 
var categorySchema = new mongoose.Schema({
    "categoryName":{
        type:String , 
        required:true
    },
    "categoryDescription":{
        type:String , 
        required:true 
    }
})
var categoryModel = new mongoose.model('category',categorySchema)
module.exports = categoryModel
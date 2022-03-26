const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    stars: {
        type:Number
    },
  Comments: {
      type:String
  } ,
  product: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Product'
  }
})
const review = new mongoose.model('Review',reviewSchema)
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    stars: {
        type:Number
    },
  comments: {
      type:String
  } 

})
const review = new mongoose.model('Review',reviewSchema)
module.exports = review
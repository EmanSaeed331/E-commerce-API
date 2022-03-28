var reviewRouter= require('express').Router()
var  {addReviewToProduct, resetReview} = require('../controller/review.controller')

// create a review to product 
reviewRouter.post('/product/addReview/:id',(req,res)=>{
    addReviewToProduct(req,res)

})
// reset review 
reviewRouter.post('/product/resetReview/:id',(req,res)=>{
    resetReview(req,res)
})



module.exports = reviewRouter

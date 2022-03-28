var Product = require('../../productModule/model/productModel')
var Review = require('../model/review.model')

// add review(stars , comments)  to product 

let addReviewToProduct = async (req,res)=>{
    var productID = req.params.id 
    var product =await  Product.findById(productID)
    if (product){
    try{
        var review = new Review ({
            ...req.body
            });
         product.reviews.push(review);
      
         await product.save()
         console.log('ccc'+product)

        res.status(201).send(product)
    }
    catch(err){
        res.status(404).send(err)
    }
}
    
    else{
        res.status(404).send({message:"product not found" })
    }
}
// reset reviews 
let resetReview = async (req,res)=>{
    var productID = req.params.id 
    var product =await  Product.findById(productID)
    if (product){
    try{
        var review = new Review ({
            ...req.body
            });

         product.reviews.pop(review);
      
         await product.save()
         console.log('ccc'+product)

        res.status(201).send(product)
    }
    catch(err){
        res.status(404).send(err)
    }
}
    
    else{
        res.status(404).send({message:"product not found" })
    }
}
module.exports = {addReviewToProduct, resetReview}
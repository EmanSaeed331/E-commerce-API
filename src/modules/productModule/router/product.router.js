const productRouter = require('express').Router()
const { createProduct, getProduct ,updateProduct } = require('../controller/product.controller')


//Create Product 
productRouter.post('/createProduct',(req,res) => {
    createProduct(req,res)
})
// Get all products
productRouter.get('/getAllProducts',(req,res)=>{
    getProduct(req,res)
    
})
// update product 
productRouter.patch('/updateProduct/:id', (req,res)=>{
    updateProduct(req,res)
})
module.exports = productRouter

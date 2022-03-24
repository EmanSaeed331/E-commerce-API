const productRouter = require('express').Router()
const { createProduct, getProduct ,updateProduct, deleteProduct ,sortByNameAndPrice} = require('../controller/product.controller')


//Create Product 
productRouter.post('/createProduct',(req,res) => {
    createProduct(req,res)
})
// List all  products
productRouter.get('/getAllProducts',(req,res)=>{
    getProduct(req,res)
    
})
// update product 
productRouter.patch('/updateProduct/:id', (req,res)=>{
    updateProduct(req,res)
})
// delete product
productRouter.delete('/deleteProduct/:id',(req,res)=>{
    deleteProduct(req,res)
})
// sortByNameAndPrice
productRouter.get('/sortByNameAndPrice',(req,res)=>{
    sortByNameAndPrice(req,res);
})
module.exports = productRouter

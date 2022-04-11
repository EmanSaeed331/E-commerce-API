const productRouter = require('express').Router()
const { createProduct, getProduct ,updateProduct, deleteProduct ,sortByNameAndPrice ,addProductToCatalog} = require('../controller/product.controller')
const {AdminAuth} = require('../../../middleware/auth')

//Create Product 
productRouter.post('/createProduct',AdminAuth,(req,res) => {
    createProduct(req,res)
})
// List all  products
productRouter.get('/getAllProducts',AdminAuth,(req,res)=>{
    getProduct(req,res)
    
})
// update product 
productRouter.patch('/updateProduct/:id',AdminAuth, (req,res)=>{
    updateProduct(req,res)
})
// delete product
productRouter.delete('/deleteProduct/:id',AdminAuth(req,res)=>{
    deleteProduct(req,res)
})
// sortByNameAndPrice
productRouter.get('/sortByNameAndPrice',(req,res)=>{
    sortByNameAndPrice(req,res);
})
// add product to specific category , id : category ID 
productRouter.post('/addProduct/:id',AdminAuth,(req,res)=>{
    addProductToCatalog(req,res)
})
module.exports = productRouter

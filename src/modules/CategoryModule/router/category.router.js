const categoryRouter = require('express').Router()
var {createCategory , getCategory , deleteCategory ,updateCategory } = require('../controller/category.controller')
var {AdminAuth} = require('../../../middleware/auth')

categoryRouter.post('/createCategory',AdminAuth,(req,res) => {
    createCategory(req,res)
})

// retrieve all categories

categoryRouter.get('/getAllCategories' ,AdminAuth, (req,res)=>{
    getCategory(req,res)
})


// delete category 
categoryRouter.delete('/deleteCategory/:id',AdminAuth,(req,res)=>{
    deleteCategory(req,res);
})
// update 
categoryRouter.patch('/updateCategory/:id',AdminAuth,(req,res)=>{
    updateCategory(req,res);
})
module.exports = categoryRouter
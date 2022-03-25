const categoryRouter = require('express').Router()
var {createCategory , getCategory , deleteCategory ,updateCategory } = require('../controller/category.controller')

categoryRouter.post('/createCategory',(req,res) => {
    createCategory(req,res)
})

// retrieve all categories

categoryRouter.get('/getAllCategories' , (req,res)=>{
    getCategory(req,res)
})


// delete category 
categoryRouter.delete('/deleteCategory/:id',(req,res)=>{
    deleteCategory(req,res);
})
// update 
categoryRouter.patch('/updateCategory/:id',(req,res)=>{
    updateCategory(req,res);
})
module.exports = categoryRouter
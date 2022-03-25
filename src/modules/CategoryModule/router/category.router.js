const categoryRouter = require('express').Router()
var {createCategory , getCategory , deleteCategory} = require('../controller/category.controller')

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

module.exports = categoryRouter
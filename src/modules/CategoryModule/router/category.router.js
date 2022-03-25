const categoryRouter = require('express').Router()
var createCategory = require('../controller/category.controller')

categoryRouter.post('/createCategory',(req,res) => {
    createCategory(req,res)
})


module.exports = categoryRouter
let adminRouter = require('express').Router()
let { getUsersCount, getCategoriesCount, getAllProducts } = require('../controller/controller.admin')

// get All Users count 
adminRouter.get('/Admin/getUserCount',(req,res) => {
    getUsersCount(req,res);
})

// get All Categories Count
adminRouter.get('/Admin/getCategoriesCount',(req,res)=>{
    getCategoriesCount(req,res);

})

// get All Product Count 

adminRouter.get('/Admin/getProductCount',(req,res)=>{
    getAllProducts(req,res)

})

module.exports = adminRouter
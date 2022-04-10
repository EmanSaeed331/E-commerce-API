let adminRouter = require('express').Router()
let { getUsersCount, getCategoriesCount, getAllProducts,AdminSignUp ,AdminLogin  } = require('../controller/controller.admin')
let {AdminAuth} = require('../../../middleware/auth')

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

// Admin SignUp 
adminRouter.post('/Admin/SignUp',async(req,res)=>{
    AdminSignUp(req,res);
})
// Admin Login 
adminRouter.post('/Admin/SignIn',async(req,res)=>{
    AdminLogin(req,res)
})

module.exports = adminRouter
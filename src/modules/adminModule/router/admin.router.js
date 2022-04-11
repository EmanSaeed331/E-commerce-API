let adminRouter = require('express').Router()
let { 
    getUsersCount, 
    getCategoriesCount, 
    getAllProducts,
    AdminSignUp ,
    AdminLogin,
     AdminUpdate ,
     AdminDelete } = require('../controller/controller.admin')
let {AdminAuth} = require('../../../middleware/auth')

// get All Users count 
adminRouter.get('/Admin/getUserCount',AdminAuth,(req,res) => {
    getUsersCount(req,res);
})

// get All Categories Count
adminRouter.get('/Admin/getCategoriesCount',AdminAuth,(req,res)=>{
    getCategoriesCount(req,res);

})

// get All Product Count 

adminRouter.get('/Admin/getProductCount',AdminAuth,(req,res)=>{
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
// Admin Update 
adminRouter.patch('/Admin/UpdateInfo',AdminAuth,async(req,res)=>{
    AdminUpdate(req,res)
})
//Admin Delete 
adminRouter.delete('/Admin/DeleteAdmin/:id',async(req,res)=>{
    AdminDelete(req,res)
})

module.exports = adminRouter
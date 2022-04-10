var users = require('../../Usermodule/models/userModel')
var category = require('../../CategoryModule/model/category.model')
var product = require('../../productModule/model/productModel')
var admin = require('../model/model.admin')


// get Count of users 
let getUsersCount = (req,res)=>{
      users.count({}, function(error, numOfUsers){
        if (error){
            console.log('cant count users numbers ')
            res.status(404).send({message:"Can't count users numbers"})
        }
   /*      user.update({'Users':numOfUsers})
        user.save() */
       
        res.status(200).send({Users:numOfUsers}) 
})
}
// get Count of Categories 
let getCategoriesCount = (req,res) =>{
    category.count({},function(error , numOfCategories){
        if(error){
            res.status(404).send({message:"Cant count categories numbers"})
        }
        res.status(200).send({Categories:numOfCategories})
    })
}
// get count of  products
let getAllProducts = (req,res)=>{
    product.count({},((error,numOfProduct)=>{
        if(error) {
            res.status(404).send({messaga:"Cant count products numbers"})
        }
        res.status(200).send({Product:numOfProduct})
    }))
}

// signUp Admin
let AdminSignUp  = async (req,res)=>{
    const adminUser = new admin(req.body)
    try{
     await adminUser.save();
     console.log(`Adminnn${adminUser}`)
     const token =  await adminUser.generateAuthToken()
     res.status(201).send({adminUser , token });
    }
    catch (e){
        console.log(e)
        res.status(400).send(e)
    }

}
//login Admin
let AdminLogin =async (req,res)=>{
    try{
        const adminUser = await admin.findByCredentials(req.body.email , req.body.password)
        console.log(adminUser)

        const token = await adminUser.generateAuthToken()
        console.log(token)
        res.status(201).send({adminUser,token})
    }
    catch(e){
        console.log(`error${e}`)
        res.status(404).send(`${e}`)
    }
}
// update Admin
// Delete Admin 

module.exports = 
     { 
     getUsersCount ,
      getCategoriesCount,
      getAllProducts,
      AdminSignUp,
      AdminLogin
    }
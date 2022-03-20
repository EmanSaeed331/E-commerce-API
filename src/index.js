const express = require('express')
const app = express()
app.use(express.json())
const userRouter = require('./modules/Usermodule/router/user_router')
const productRouter = require('./modules/productModule/router/product.router')
const port = process.env.PORT | 5000;
require('./db/mongoose')
app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.listen(port,()=>{
    console.log(`Server is running on port + ${port}`)
})
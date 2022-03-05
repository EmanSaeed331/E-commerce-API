const express = require('express')
const app = express()
const userRouter = require('./modules/Usermodule/router/user_router')
const port = process.env.PORT | 5000;
require('./db/mongoose')
app.use(express.json())
app.use(userRouter)
app.listen(port,()=>{
    console.log(`Server is running on port + ${port}`)
})
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/E-commerce-app' , {
    useNewUrlParser: true , useUnifiedTopology:true})
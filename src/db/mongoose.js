const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://'+ process.env.MONGODB_USER +':'+ process.env.MONGODB_PW +'@cluster0.ulobg.mongodb.net/E-commerce-app?retryWrites=true&w=majority';
const LocalDB = 'mongodb://127.0.0.1:27017/E-commerce-app'
mongoose.connect(connectionString , {
    useUnifiedTopology:true ,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

})


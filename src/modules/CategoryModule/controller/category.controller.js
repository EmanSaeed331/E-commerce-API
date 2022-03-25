const Category = require('../model/category.model')

// create Category 
var createCategory = async(req,res)=>{
    try{
    var category = new Category(req.body)
    await category.save()

    res.status(200).send(category)
    }catch(e){

        res.status(404).send({error:e})
    }
}
// retrieve Categories
const getCategory = async(req, res) => {
    try{
    const category = await Category.find({})
    res.status(200).send(category)
    }
    catch(err){
        res.status(200).send({err:err})
    }
}
// delete Category
// list Category
// add products to Category

module.exports ={ 
    createCategory,
    getCategory
}
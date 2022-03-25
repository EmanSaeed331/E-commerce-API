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
let getCategory = async(req, res) => {
    try{
    const category = await Category.find({})
    res.status(200).send(category)
    }
    catch(err){
        res.status(200).send({err:err})
    }
}
// delete Category
let deleteCategory = async (req,res)=>{
    try{
        await Category.findByIdAndDelete({_id:req.params.id})
      
        res.status(200).send({message:"deleted successfully"})
    }
    catch(error) {
        console.log(error)
        res.status(404).send({error})
    }

}
// list Category
// update Category 
let updateCategory = async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['categoryName','categoryDescription']
    const isAvailable =updates.every((update)=>allowedUpdates.includes(update))
    if (!isAvailable){
        return res.status(404).send({message:'Invalid updates!'})
    }
    try{
        const category = await Category.findOne({_id:req.params.id})
        if (!category){
            return res.status(404).send({message:'product not found'})
        }
        updates.forEach((update)=> category [update] = req.body[update])
        await category.save()
        res.status(200).send(category)
    }
    catch(error) {
        console.log(error)
        res.status(404).send({error})
    }
}

// add products to Category

module.exports ={ 
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory

}
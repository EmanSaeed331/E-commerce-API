const Product = require('../model/productModel')
var Category = require('../../CategoryModule/model/category.model')
console.log(Category)

// Create Product 
const createProduct = async(req,res)=>{
    try{
    const product = new Product(req.body)
    await product.save()

    res.status(200).send(product)
    }catch(e){
        res.status(404).send({error:e})
    }
}
// get Product 
const getProduct = async(req, res) => {
    try{
    const product = await Product.find({})
    res.status(200).send(product)
    }
    catch(err){
        res.status(200).send({err:err})
    }
}
// Update product 
let updateProduct = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['productName','productDescription','productPrice']
    const isAvailable =updates.every((update)=>allowedUpdates.includes(update))
    if (!isAvailable){
        return res.status(404).send({message:'Invalid updates!'})
    }
    try{
        const product = await Product.findOne({_id:req.params.id})
        if (!product){
            return res.status(404).send({message:'product not found'})
        }
        updates.forEach((update)=> product [update] = req.body[update])
        await product.save()
        res.status(200).send(product)
    }
    catch(error) {
        console.log(error)
        res.status(404).send({error})
    }
}
// Delete product 
let deleteProduct = async(req,res)=>{
    try{
        await Product.findByIdAndDelete({_id:req.params.id})
      
        res.status(200).send({message:"deleted successfully"})
    }
    catch(error) {
        console.log(error)
        res.status(404).send({error})
    }

}
// add filter (simple filter sort by {name , price })
let sortByNameAndPrice = async(req,res)=>{
  // sort in descending (-1) order by length
const sort = { productPrice : 1 , productDescription:1 };
const query = {};

try{
    const sorted = await Product.find(query).sort(sort);


    res.status(200).send({sorted})
}
catch(err){
    console.log(err)
    res.status(404).send(err)
}}
// assign product to catalog 
let addProductToCatalog = async (req,res)=>{
    var categoryID = req.params.id 
    var category =await  Category.findById(categoryID)
    if (category){
    try{
        var product = new Product ({
            ...req.body
            });
         category.products.push(product);
      
         await category.save()
        console.log('ccc'+category)

        res.status(201).send(category)
    }
    catch(err){
        res.status(404).send(err)
    }
}
    
    else{
        res.status(404).send({message:"category not found" })
    }
}

module.exports = 
{
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    sortByNameAndPrice,
    addProductToCatalog
}
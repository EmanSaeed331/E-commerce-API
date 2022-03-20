const productModel = require('../model/productModel')

// Create Product 
const createProduct = async(req,res)=>{
    try{
    const product = new productModel(req.body)
    await product.save()

    res.status(200).send(product)
    }catch(e){
        res.status(404).send({error:e})
    }
}
// get Product 
const getProduct = async(req, res) => {
    try{
    const product = await productModel.find({})
    res.status(200).send(product)
    }
    catch(err){
        res.status(200).send({err:err})
    }
}
// Update product 
// Delete product 
// List product  (get all products )
// add filter (simple filter sort by {name , price })
// assign product to catalog 

module.exports = 
{
    createProduct,
    getProduct,
}
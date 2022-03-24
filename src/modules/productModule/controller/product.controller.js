const Product = require('../model/productModel')

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
// List product  (get all products )
// add filter (simple filter sort by {name , price })
// assign product to catalog 

module.exports = 
{
    createProduct,
    getProduct,
    updateProduct,
}
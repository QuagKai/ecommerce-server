const Product = require('../models/product');
const { findAttriCategory } = require('./categoryController');

const showAllProducts = async(req, res, next) => {
    await Product.find()
    .then((p) => {res.json(p)})
    .catch((err)=> console.log('Find in products colletion failed'))
    next()
}

const showAProduct = async(req, res, next) => {
    await Product.findById(req.params.id)
    .then((p) => {
        console.log("Found a product");
        res.json(p)
    })
    .catch((err) => {
        console.log("Failed to update");
        throw err
    })
    next()
}

const createProduct = async(req, res, next) => {
    await Product.create(req.body)
    .then(() => console.log("Created product successfully"))
    .catch((err) => {
        console.log("Failed to created")
        throw err
    })
    await Product.save()
    .then(() => console.log("Product collection saved"))
    .catch((err) => {
        console.log("Product colletion failed to save")
        throw err
    })
    next()
}

const updateProduct = async(req, res, next) => {
    await Product.findByIdAndUpdate(req.params.id)
    .then(() => console.log("Update Successfully"))
    .catch((err) => {
        console.log("Failed to update")
        throw err
    })
    await Product.save()
    .then(() => console.log("Product collection saved"))
    .catch((err) => {
        console.log("Product colletion failed to save")
        throw err
    })
    next()
}

const deleteProduct = async(req, res, next) => {
    await Product.findByIdAndDelete(req.params.id)
    .then(() => console.log("Successfully delete"))
    .catch((err) => {
        console.log("Failed to delete")
        throw err
    })
    await Product.save()
    .then(() => console.log("Product collection saved"))
    .catch((err) => {
        console.log("Product colletion failed to save")
        throw err
    })
    next()
}

module.exports = { showAllProducts, showAProduct, createProduct, updateProduct, deleteProduct }
=======
const searchProduct = async (request) => {
    const search = request.body.search
    
    const results = await Product.find({
        $or: [
          { name: { $regex: search, $options: 'i' } }, // Case-insensitive search in 'name' field
          { description: { $regex: search, $options: 'i' } }, // Case-insensitive search in 'description' field
        ],
      });

    return results
}

module.exports = { showAllProducts, searchProduct }


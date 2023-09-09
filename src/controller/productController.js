const Product = require('../models/product')

const showAllProducts = async(req, res, next) => {
    await Product.find()
    .then((p) => {res.json(p)})
    .catch((err)=> console.log('Find in products colletion failed'))
    next()
}

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
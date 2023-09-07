const Product = require('../models/product')

const showAllProducts = async(req, res, next) => {
    await Product.find()
    .then((p) => {res.json(p)})
    .catch((err)=> console.log('Find in products colletion failed'))
    next()
}

module.exports = { showAllProducts }
const Category = require('../models/category');

const findAttriCategory = async (req, res, next) => {
    await Category.findOne({name: req.params.name})
    .then((cat) => {
        res.json(cat.attCate);
    })
    .catch((err) => {
        console.log("Error in attCate")
        throw err
    })
    next()
}

module.exports = { findAttriCategory }
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

const loadAllCategories = async (req, res, next) => {
    await Category.find()
    .then((allCat) => {
        res.json(allCat)
    })
    .catch((err) => {
        console.log("Error in find all categories")
        throw err
    })
    next();
}

const findProductOfCategory = async(req, res, next) => {
    await Category.find({name: req.params.name}). populate('items')
    .then((allCat) => {
        res.json(allCat)
    })
    .catch((err) => {
        console.log("Error in find all categories")
        throw err
    })
    next();
}

module.exports = { findAttriCategory, loadAllCategories }
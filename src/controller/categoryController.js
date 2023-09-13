const Category = require('../models/category');
//create category sample data

const sampleCategories = [
    {
        name: 'Category 1',
        imgURL: 'a9g2wzp5enkeol2id2pzl.png',
        attCate: 'Attribute 1',
    },
    {
        name: 'Category 2',
        imgURL: 'a9g2wzp5enkeol2id2pzl.png',
        attCate: 'Attribute 2',
    },
    // Add more sample categories as needed
];

const insertSampleCategories = async () => {
    await Category.insertMany(sampleCategories);

    console.log('Sample categories inserted');
};

// insertSampleCategories();

const getCategories = async () => {
    const response = await Category.find()
    return response;
}

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

module.exports = { findAttriCategory, loadAllCategories, getCategories }
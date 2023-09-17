const Category = require('../models/category');
const Products = require('../models/product');
const path = require('path');

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
];

const insertSampleCategories = async () => {
    await Category.insertMany(sampleCategories);

    console.log('Sample categories inserted');
};

const getCategories = async () => {
    const response = await Category.find()
    return response;
}

const updateCategory = async (req, res, next) => {
    const { _id, name } = req.body;
    console.log('dd');

    const response = await Category.findByIdAndUpdate(_id, { name })
    .then(() => {
        console.log("Update category successfully");
    })
    .catch((err) => {
        console.log("Error in update category");
        throw err
    }
    )
    return response;

}

const deleteCategory = async (req, res, next) => {
    const { _id } = req.body;
    let checked = false;
    const response = await Products.find({category: _id})
    .then((p) => {
        if(p.length > 0){
            console.log("There are some products in this category");
             checked = false;
            return res.json({message: "There are some products in this category"});
        }
        else{
             checked = true;
            return true;
        }
    })

    if(checked){
        const response = await Category.findByIdAndDelete(_id)
        .then(() => {
            console.log("Delete category successfully");
            return true;
        })
        .catch((err) => {
            console.log("Error in delete category");
            throw err
        })
    }

    return response;
}

const createCategory = async (req, res, next) => {
    const { name,  attCate } = req.body;

    const category = new Category({
        name,
        attCate: attCate,
    });

    await category.save();
}

const checkCategory = async (req, res, next) => {
    const { _id } = req.body;

    const response = await Category.findById(_id)
    .then((cat) => {
        if(cat.attCate !== null){
            return true;
        }
        else{
            return false;
        }
    })
    .catch((err) => {
        console.log("Error in check category");
        throw err
    })
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

const getCateName = async (req, res, next) => {
    const response = await Category.findOne({_id: req.body.id})
    
    return response
}
module.exports = { findAttriCategory, loadAllCategories, getCategories, updateCategory, createCategory, findProductOfCategory, deleteCategory, checkCategory, getCateName }
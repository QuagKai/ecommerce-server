const Category = require('../models/category');
const Products = require('../models/product');
const path = require('path');
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
    const checked = false;

    const response = await Products.find({category: _id})
    .then((p) => {
        if(p.length > 0){
            console.log("There are some products in this category");
            return false;
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
    const uploadedFile = req.files.image;
    const { name,  attCate } = req.body;
  
    const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const filename = randomName + path.extname(uploadedFile.name);
  
    const filePath = path.join("./src/image", filename);
    uploadedFile.mv(filePath, (err) => {
      if (err) {
        console.error('Error moving file:', err);
        return { error: 'An error occurred while moving the file.' }
      }
  
     return { message: 'File uploaded and stored successfully!' };
    });

    const category = new Category({
        name,
        imgURL: filePath,
        attCate: attCate,
    });

    await category.save();
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

module.exports = { findAttriCategory, loadAllCategories, getCategories, updateCategory, createCategory, findProductOfCategory, deleteCategory }
const Product = require('../models/product');
const { findAttriCategory } = require('./categoryController');
const path = require('path');
const fs = require('fs');

const sampleProducts = [
    {
      sellerId: '64fd38efa592ed3f1c3468ae',
      name: 'Product 1',
      imgURl: 'a9g2wzp5enkeol2id2pzl.png',
      descrip: 'Description for Product 1',
      brand: 'Brand 1',
      cost: 100.99,
      category_att: 'Category 1',
    },
    {
      sellerId: '609c0e964b0ee32bcc29f31b',
      name: 'Product 2',
      imgURl: 'a9g2wzp5enkeol2id2pzl.png',
      descrip: 'Description for Product 2',
      brand: 'Brand 2',
      cost: 200.49,
      category_att: 'Category 2',
    },
    // Add more sample products as needed
  ];
  
  //insert data
  const insertSampleProducts = async () => {
    await Product.insertMany(sampleProducts);

    console.log('Sample products inserted');
  };

  insertSampleProducts();


const showSellerProducts = async(req, res, next) => {
   try {
        const id = req.body.userId;
        const products = await Product.find({ sellerId: id });

       return products;
   } catch (error) {
         console.log("Failed to show all products");
         throw error
    }
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
  const uploadedFile = req.files.image;
  const { name, descrip, brand, cost, category_att } = req.body;

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

  const product = new Product({
    sellerId: req.body.userId,
    name,
    imgURl: filePath,
    descrip,
    brand,
    cost,
    category_att,
  });

  await product.save();
}

const updateProduct = async(req, res, next) => {
    try {
        const { _id, name, imgURl, descrip, brand, cost, category_att } = req.body;

       await Product.findByIdAndUpdate(_id, {
            name,
            imgURl,
            descrip,
            brand,
            cost,
            category_att
        })
        .then(() => console.log("Successfully update"))
    } catch (error) {
        console.log("Failed to update");
        throw error
    }
}

const deleteProduct = async(req, res, next) => {
    try {
        const { _id } = req.body;

        await Product.findByIdAndDelete(_id)

        return [{ message: "Delete successfully!" }, { status: 200 }];
    } catch (error) {
        return [{ message: error }];
    }
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

module.exports = { showSellerProducts, searchProduct, updateProduct, deleteProduct, createProduct }


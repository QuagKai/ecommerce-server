const Product = require('../models/product');
const Carts = require('../models/cart');
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
const showAllProducts = () => {
    return Product.find()
    .then((p) => {
        return p
    })
    .catch((err)=> console.log('Find in products colletion failed'))
  
}

const showAProduct = async(id) => {
    return Product.findById(id)
    .then((p) => {
        console.log("Found a product");
        return p
    })
    .catch((err) => {
        console.log("Failed to update");
        throw err
    })
}

const addToCart =  async(pid, cid) => {
    return await Carts.findOne({cartOwner: cid})
    .then(async (cart) => {
        if (cart && cart.items.length > 0) {
            let dup = false;
            for (let i = 0; i < cart.items.length; i++) {
                if (cart.items[i].product == pid) {
                    cart.items[i].quantity += 1
                    dup = true
                    console.log("Increase quantity by one")
                    break
                } 
            }
            if (dup == false) {
                cart.items.push({product: pid, quantity: 1})
                console.log("New item is pushed in existed cart")
            }
        } else {
            await Carts.create({cartOwner: cid})
            .then((cart) => {
                cart.items.push({product: pid, quantity: 1})
            })
            .catch((err) => console.log("Cannot create a create and pust items: " + err))
        }
    })
    .catch((err) => console.log("addToCart function error: " + err))
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

module.exports = { showSellerProducts,showAllProducts, showAProduct, 
                  addToCart, createProduct, updateProduct, deleteProduct, searchProduct }


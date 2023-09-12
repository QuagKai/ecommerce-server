const Product = require('../models/product');
const Carts = require('../models/cart');
const { findAttriCategory } = require('./categoryController');

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

module.exports = { showAllProducts, showAProduct, addToCart, createProduct, updateProduct, deleteProduct, searchProduct }

const { customerRegister, customerLogin } = require('./src/controller/customerController')
const { sellerRegister, sellerLogin } = require('./src/controller/sellerController')
const { searchProduct} = require('./src/controller/productController')
const jwt = require('jsonwebtoken');

const express = require('express');
const { showAllProducts, showAProduct, createProduct, updateProduct, deleteProduct } = require('./src/controller/productController');
const { findAttriCategory, loadAllCategories } = require('./src/controller/categoryController');
const router = express.Router();
router.use(express.json());

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Store the user object in the request
    req.user = decoded;
    next();
  });
}

router.get('/homepage', (req, res) => {
    res.send('This is a homepage');
})

//All routes for product management
router.get('/product', async (req, res) => {
    const response = await showAllProducts(req);

    res.json(response);
})

router.post('/product', async (req, res) => {
    const response = await createProduct(req);

    res.json(response);
})

router.post('/update-product', async (req, res) => {
    const response = await updateProduct(req);

    res.json(response);
})

router.delete('/product', async (req, res) => {
    const response = await deleteProduct(req);

    res.json(response);
})

// router.get('/manager/product/create?category=$name', createProduct, findAttriCategory, (req, res) => {
//     console.log('createProduct route end');
// })

// router.get('/manager/product/update?id=$id', updateProduct, (req, res) => {
//     console.log("updateProduct route end");
// })

// router.get('/manager/product/delete?id=$id', deleteProduct, (req, res) => {
//     console.log("deleteProduct route end");
// })

// router.get('/homepage', (req, res) => {
//     res.send('This is a homepage')
// })

// router.get('/manager/showAllProducts', showAllProducts, (req, res) => {
//     console.log('showProduct route end');

// })

//Route for customer
router.put('/customer', async (req, res) => {
    const response = await customerRegister(req);

    res.send(response);
})

router.post('/login/customer', async (req, res) => {
    const response = await customerLogin(req);

    res.send(response);
})

router.post('/search', async (req, res) => {
  const response = await searchProduct(req);

  res.send(response);
})
//

//Route for seller
router.put('/seller', (req, res) => {
    const response = sellerRegister(req);

    res.send(response);
})

router.post('/login/seller', async (req, res) => {
    const response = await sellerLogin(req);

    res.send(response);
})

//get id
router.get('/me', verifyToken, (req, res) => {
  const userId = req.user.userId;
  
  res.json({ message: 'Access granted', userId });
});

//get id
router.get('/me', verifyToken, (req, res) => {
  const userId = req.user.userId;
  
  res.json({ message: 'Access granted', userId });
});

router.get('/browsing/all', showAllProducts, (req, res) => {
    console.log("browsing all route end")
})

router.all('/browsing/category', loadAllCategories, (req, res) => {
    console.log("loadingAllCategories route end")
})

router.get('/browsing/product/:id', showAProduct, (req, res) => {
    console.log("browsing a product route end")
})

module.exports = router
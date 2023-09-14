const { customerRegister, customerLogin } = require('./src/controller/customerController')
const { sellerRegister, sellerLogin } = require('./src/controller/sellerController')
const jwt = require('jsonwebtoken');

const express = require('express');
const { showSellerOrder, setSellerOrderStatus } = require('./src/controller/orderController');
const { showSellerProducts, showAllProducts, showAProduct, addToCart, displayCart, createProduct, updateProduct, deleteProduct, searchProduct, removeItemCart } = require('./src/controller/productController');
const { findAttriCategory, loadAllCategories, getCategories } = require('./src/controller/categoryController');
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

//router to display image
router.get('/images/:id', (req, res) => {
    const { id } = req.params;  
    res.sendFile(__dirname + `/src/image/${id}`);
})

router.use('/images', express.static('./src/image'));

//category controller 
router.get('/category', async (req, res) => {
  const response = await getCategories(req);

  res.send(response);
})
//All routes for product management


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

router.post('/seller/order', async (req, res) => {
    const response = await showSellerOrder(req);

    res.send(response);
})

router.put('/seller/order', async (req, res) => {
  const response = await setSellerOrderStatus(req);

  res.json(response);
})

router.post('/seller/product', async (req, res) => {
  console.log(req)
  const response = await showSellerProducts(req);

  res.json(response);
})

router.post('/seller/upload', async (req, res) => {
console.log(req)
  const response = await createProduct(req);

  res.json(response);
})

router.post('/seller/update-product', async (req, res) => {
  const response = await updateProduct(req);

  res.json(response);
})

router.delete('/seller/product', async (req, res) => {
  const response = await deleteProduct(req);

  res.json(response);
})

router.get('/browsing/all', async (req, res) => {
    const response = await showAllProducts();
    res.send(response);
    console.log("browsing all route end")
})

//get id
router.get('/me', verifyToken, (req, res) => {
  const userId = req.user.userId;
  
  res.json({ message: 'Access granted', userId });
});

router.get('/browsing/product/:id', async (req, res) => {
    const response = await showAProduct(req.params.id);
    res.send(response);
    console.log("browsing a product route end")
})

router.get('/browsing/categories', async (req, res) => {
  const response = await getCategories();
  res.send(response);
  console.log("Get category route end")
})

// router.all('/browsing/category', loadAllCategories, (req, res) => {
//     console.log("loadingAllCategories route end")
// })

router.use('/images', express.static('./src/image'));

router.post('/browsing/product/:id/addToCart/:userId', async (req, res) => {
  const { id, userId } = req.params;
  try {
    const updatedCart = await addToCart(id, userId);
    res.json(updatedCart); // Send the updated cart back to the client
    console.log('addToCart route end')
  } catch (error) {
    console.log("Error in addToCart route:", error);
  }
})

router.post('/browsing/product/:id/removeItemCart/:userId', async (req, res) => {
  const { id, userId } = req.params;
  try {
    const updatedCart = await removeItemCart(id, userId);
    res.json(updatedCart); // Send the updated cart back to the client
    console.log('removeItemCart route end')
  } catch (error) {
    console.log("Error in removeItemCart route:", error);
  }
})

router.get('/customer/:userId/cart', async(req, res) => {
  const { userId } = req.params;
  try {
    const getDisplayCart = await displayCart(userId)
    console.log(getDisplayCart);
    res.json(getDisplayCart);
    console.log('displayCart route end')
  } catch (err) {
    console.log('Error in displayCart route', err)
  }
})



module.exports = router
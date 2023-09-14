const { customerRegister, customerLogin } = require('./src/controller/customerController')
const { sellerRegister, sellerLogin, getAllSeller, changeStatus } = require('./src/controller/sellerController')
const jwt = require('jsonwebtoken');

const express = require('express');
const { showSellerOrder, setSellerOrderStatus } = require('./src/controller/orderController');
const { showSellerProducts, showAllProducts, showAProduct, addToCart, displayCart, createProduct, updateProduct, deleteProduct, searchProduct, removeItemCart } = require('./src/controller/productController');
const { findAttriCategory, loadAllCategories, getCategories, updateCategory, createCategory, deleteCategory } = require('./src/controller/categoryController');
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

//get id
router.get('/me', verifyToken, (req, res) => {
  const userId = req.user.userId;
  
  res.json({ message: 'Access granted', userId });
});


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

router.post('/category', async (req, res) => {
  const response = await createCategory(req);

  res.send(response);
})

router.put('/category', async (req, res) => {
  console.log('hello')
  const response = await updateCategory(req);

  res.send(response);
})

router.post('/delete-category', async (req, res) => {
  const response = await deleteCategory(req);

  res.send(response);
})

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
router.put('/seller', async (req, res) => {
    const response = await sellerRegister(req);

    res.send(response);
})

router.get('/sellers', async (req, res) => {
  const response = await getAllSeller(req);

  res.send(response);
})

router.post('/login/seller', async (req, res) => {
    const response = await sellerLogin(req);

    res.send(response);
})

router.put('/seller/status', async (req, res) => {
  const response = await changeStatus(req);

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

router.use('/images', express.static('./src/image'));

router.post('/browsing/product/:id/addToCart/:userId', async (req, res) => {
  const { id, userId } = req.params;
  try {
    const updatedCart = await addToCart(id, userId);
    res.json(updatedCart);
    console.log('addToCart route end')
  } catch (error) {
    console.log("Error in addToCart route:", error);
  }
})

router.post('/browsing/product/:id/removeItemCart/:userId', async (req, res) => {
  const { id, userId } = req.params;
  try {
    const updatedCart = await removeItemCart(id, userId);
    res.json(updatedCart); 
    console.log('removeItemCart route end')
  } catch (error) {
    console.log("Error in removeItemCart route:", error);
  }
})

router.get('/customer/:userId/cart', async(req, res) => {
  const { userId } = req.params;
  try {
    const getDisplayCart = await displayCart(userId)
    res.json(getDisplayCart);
    console.log('displayCart route end')
  } catch (err) {
    console.log('Error in displayCart route', err)
  }
})



module.exports = router
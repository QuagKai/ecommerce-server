const { customerRegister, customerLogin } = require('./src/controller/customerController')
const { sellerRegister, sellerLogin } = require('./src/controller/sellerController')
const { searchProduct} = require('./src/controller/productController')

const express = require('express');
const { showAllProducts } = require('./src/controller/productController')
const router = express.Router();
router.use(express.json());

//authenticator middleware
function authenticateToken(req, res, next) {
    const token = req.header('Authorization'); // You may send the token in the 'Authorization' header
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied: No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      // Token is valid; you can access the user information (e.g., user.userId)
      req.user = user;
      next();
    });
  }

router.get('/homepage', (req, res) => {
    res.send('This is a homepage')
})

router.get('/manager/showAllProducts', showAllProducts, (req, res) => {
    console.log('showProduct route end');
})

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



module.exports = router
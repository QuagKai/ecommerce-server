const express = require('express');
const { showAllProducts } = require('./src/controller/productController')
const router = express.Router();

router.get('/api/homepage', (req, res) => {
    res.send('This is a homepage')
})

router.get('/api/manager/showAllProducts', showAllProducts, (req, res) => {
    console.log('showProduct route end');
})

module.exports = router
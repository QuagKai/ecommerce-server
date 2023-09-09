const express = require('express');
const { showAllProducts, showAProduct, createProduct, updateProduct, deleteProduct } = require('./src/controller/productController');
const { findAttriCategory } = require('./src/controller/categoryController');
const router = express.Router();

router.get('/api/homepage', (req, res) => {
    res.send('This is a homepage');
})

//All routes for product management
router.get('/api/manager/product/showAllProducts', showAllProducts, (req, res) => {
    console.log('showAllProduct route end');
})

router.get('/api/manager/product/create?category=$name', createProduct, findAttriCategory, (req, res) => {
    console.log('createProduct route end');
})

router.get('/api/manager/product/update?id=$id', updateProduct, (req, res) => {
    console.log("updateProduct route end");
})

router.get('/api/manager/product/delete?id=$id', deleteProduct, (req, res) => {
    console.log("deleteProduct route end");
})

module.exports = router
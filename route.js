const express = require('express');
const { showAllProducts, showAProduct, createProduct, updateProduct, deleteProduct } = require('./src/controller/productController')
const router = express.Router();

router.get('/api/homepage', (req, res) => {
    res.send('This is a homepage');
})

//All routes for product interaction (client role)
router.get('/api/browse/product/$id', showAProduct, (req, res) => {
    console.log("browsingAProduct route end")
})

router.post('/api/browse/$nameCate/product/$id/addToCart', addToCart, (req, res) => {
    res.redirect('/api/browse/product/$id')
    console.log("addToCart route end")
})

router.post('/api/browse/$nameCate/product/$id/removeOutCart', removeOutCart, (req, res) => {
    res.redirect('/api/browse/product/$id')
    console.log("removeOutCart route end")
})

router.get('/api/browse/all/', showAllProducts, (req, res) => {
    console.log("browsingAllProduct route end")
})

//All routes for product management
router.get('/api/manager/product/showAll', showAllProducts, (req, res) => {
    console.log('showAllProduct route end');
})

router.get('/api/manager/product/create', createProduct, (req, res) => {
    console.log('createProduct route end');
})

router.get('/api/manager/product/$id', showAProduct, (req, res) => {
    console.log("showAProduct route end");
})

router.get('/api/manager/product/$id/update', updateProduct, (req, res) => {
    console.log("updateProduct route end");
})

router.get('/api/manager/product/$id/delete', deleteProduct, (req, res) => {
    console.log("deleteProduct route end");
})

module.exports = router
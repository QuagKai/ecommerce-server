const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart');

const showSellerOrder = async (request) => {
    return 
}

const findSellerId = async (id) => {
   const sellerId = Order.findById('yourOrderId')
    .populate('cart')
    .populate('sellerId')
    
}

const findCart = async () => {

}


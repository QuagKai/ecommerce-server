const mongoose = require('mongoose');
const Carts = require('./cart');
const Products = require('./product');
const Customers = require('./customer');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
    address: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    statusUpdate: {
        productStatus: {
            type: String,
            enum: ['Shipped', 'Cancelled']
        },
        customerDecision: {
            type: String,
            enum: ['Accepted', 'Rejected']
        }
    }
})

module.exports = mongoose.model('Orders', orderSchema);
const mongoose = require('mongoose');
const Carts = require('./cart');
const Products = require('./product');

const orderSchema = new mongoose.Schema({    
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sellers'
    },
    items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
          },
          quantity: {
            type: Number,
          }
        }
      ],
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
            default: 'New'
        },
        customerDecision: {
            type: String,
            default: ""
        }
    }
})

module.exports = mongoose.model('Orders', orderSchema);
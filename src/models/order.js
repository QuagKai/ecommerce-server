const mongoose = require('mongoose');
const Carts = require('./cart');

const orderSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts'
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
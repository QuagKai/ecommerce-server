const mongoose = require('mongoose');
const Seller = require('./seller');

const productSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sellers'
    },
    cateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    name: {
        type: String,
        required: true,
    },
    imgURl: {
        type: String,
        required: true,
    },
    descrip: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
    category_att: {
        type: String,
        default: [],
    }
});

module.exports = mongoose.model('Products', productSchema);
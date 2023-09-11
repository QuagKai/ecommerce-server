const mongoose = require('mongoose');
const Products = require('./product');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    imgURL: {
        data: Buffer,
        contentType: String
    },
    attCate:{
        type: String,
        default: []
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    ]
})

module.exports = mongoose.model('Categories', categorySchema);
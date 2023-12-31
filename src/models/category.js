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
            type: Schema.Type.ObjectID,
            ref: 'Products'
        }
    ]
})

module.exports = mongoose.model('Categories', categorySchema);
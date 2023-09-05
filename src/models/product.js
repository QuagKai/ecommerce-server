const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgURl: {
        data: Buffer,
        contentType: String
    },
    descrip: {
        script1: {
            type: String,
            require: true
        },
        script2: {
            type: String,
        }
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
    brand: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Products', productSchema);
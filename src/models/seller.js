const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
    },
    businessName: {
        type: String,
        required: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model('Sellers', sellerSchema)
const mongoose = require('mongoose');
const Products = require('./product');

const cartSchema = new mongoose.Schema({
  cartOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customers',
    required: true,
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
  qty: {
    type: Number,
  },
  totalCost: {
    type: Number,
    min: 0,
  },
});

module.exports = mongoose.model('Carts', cartSchema);
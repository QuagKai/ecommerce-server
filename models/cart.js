const mongoose = require('mongoose');
const Products = require('./product');

const cartSchema = new mongoose.Schema({
  cartOwnerID: {
    type: String,
    required: true,
  },
  items: [
    {
      type: [Schema.Type.ObjectID],
      ref: 'Products'
    }
  ],
  qty: {
    type: Number,
    default: 1,
  },
  totalCost: {
    type: Number,
    min: 0,
  },
});

module.exports = mongoose.model('Carts', cartSchema);
const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart');

//create sample order
const sampleOrders = [
    {
        created_by: '609c0e964b0ee32bcc29f31b',
        sellerId: '64fd38efa592ed3f1c3468ae',
        items: [
            {   product: '65000b6b61747a2e68e18294',
                quantity: 2
            },
            {   product: '65000b5961747a2e68e18286',
                quantity: 1
            }
        ],
        address: '123 Nguyen Van Linh',
        date: '2021-05-15T16:00:00.000+00:00',
    },
]

const insertSampleOrders = async () => {
    await Order.insertMany(sampleOrders);

    console.log('Sample orders inserted');
};

insertSampleOrders();

const findSellerId = async (id) => {
   const sellerId = Order.findById('yourOrderId')
    .populate('cart')
    .populate('sellerId')
    
}

const setSellerOrderStatus = async (request) => {
    const orderId = request.body.orderId;
    const status = request.body.status;

    Order.findByIdAndUpdate(
        orderId,
        { 'statusUpdate.productStatus': status },
        { new: true } // To return the updated document
      )
        .then((updatedOrder) => {
          if (updatedOrder) {
            // The 'updatedOrder' contains the updated document
            console.log(updatedOrder);
          } else {
            console.log('Order not found');
          }
        })
        .catch((err) => {
          // Handle any errors that may occur during the update operation
          console.error(err);
        });
}

//get all orders of a seller
const showSellerOrder = async (request) => {
    const sellerId = request.body.userId;
    const orders = await Order.find({ sellerId: sellerId })
      .populate({
        path: 'items.product',
        select: 'name', // Specify the field(s) you want from the Product collection
      }).populate({
        path: 'created_by',
        select: 'email',
        });

      return orders;
}

module.exports = { showSellerOrder, setSellerOrderStatus }

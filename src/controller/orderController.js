const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart');

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

// insertSampleOrders();

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
        { new: true }
      )
        .then((updatedOrder) => {
          if (updatedOrder) {
            console.log(updatedOrder);
          } else {
            console.log('Order not found');
          }
        })
        .catch((err) => {
          console.error(err);
        });
}


const showSellerOrder = async (request) => {
    const sellerId = request.body.userId;
    const orders = await Order.find({ sellerId: sellerId })
      .populate({
        path: 'items.product',
        select: 'name',
      }).populate({
        path: 'created_by',
        select: 'email',
        });
      return orders;
}

const showCustomerOrder = async (request) => {
    const userId = request.body.userId;
    const orders = await Order.find({ created_by: userId});

      return orders;
}

const updateOrderStatus = async (request) => {
    const {orderId, status} = request.body;
    console.log(orderId, status)
    const order = await Order.findByIdAndUpdate(orderId, {'statusUpdate.customerDecision': status});

    return order;
}

const createOrder = async (request) => {
  const { userId, sellerId, address, items } = request.body;
  const order = new Order({
    created_by: userId,
    sellerId,
    address,
    items,
  });
  await order.save();
}

module.exports = { showSellerOrder, setSellerOrderStatus, findSellerId, showCustomerOrder, updateOrderStatus, createOrder }

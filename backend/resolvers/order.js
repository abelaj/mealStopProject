const { Customer, Restaurant, Order, FoodItem } = require("../models")
const CustomerResolver = require('./customer')
const RestaurantResolver = require('./restaurant');

const placeOrder = async (_, args) => {
  try {
    // console.log({ args })
    const { api_token, contents } = args;
    if (api_token) {
      const customer = await CustomerResolver.validateCustomer(api_token);
      let order = new Order()
      order.contents = contents;
      order.customer = customer;
      order.status = 'placed';
      await order.save().exec();
      return order;
    } else {
      let order = new Order({ contents, status: 'Placed' })
      await order.save().exec();
      return order;
    }
  } catch (e) {
    return e.message;
  }
}

const updateOrderStatus = async (_, args) => {
  const { api_token, order_id, new_status } = args;
  if (api_token) {
    console.log(RestaurantResolver.validateRestaurant)
    const restaurant = await RestaurantResolver.validateRestaurant(api_token);
    console.log(restaurant)
    if (!restaurant) {
      throw new Error('Not validated');
    }
    const order = await Order.findById(order_id).exec();
    if (!order) {
      throw new Error('Invalid Order');
    }
    order.status = new_status;
    await order.save().exec();
    return order;

  }
}

const getOrders = async (_, args) => {
  const { api_token } = args;
  console.log("Getting orders")
  const orders = await Order.find({}).exec()
  console.log(orders)
  return orders;

}

module.exports = { placeOrder, getOrders, updateOrderStatus }

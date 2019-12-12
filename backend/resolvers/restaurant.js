const { Customer, Restaurant, Order, FoodItem } = require("../models")


const validateRestaurant = async (api_token) => {
  const restaurant = await Restaurant.findOne({ api_token }).exec();
  if (!restaurant) {
    console.log("Invalid auth")
    throw new Error("Unauthorized")
  } else {
    return restaurant

  }
}
const addMenuItem = async (_, args) => {
  try {
    const { api_token, name, description, price } = args;
    await validateRestaurant(api_token);
    const foodItem = new FoodItem({ name, description, price, rating: 5, numberOfRatings: 0 });
    return await foodItem.save();
  } catch (e) {
    throw e.message
  }
}

const filterFoodItemPrices = (foodItems, status) => {
  let filteredFoodItems = [];
  for (let i = 0; i < foodItems.length; i++) {
    let tempItem = { ...foodItems[i]._doc };
    tempItem.price = tempItem.price[status];
    filteredFoodItems.push(tempItem);
  }
  return filteredFoodItems;
}
const getMenu = async (_, args) => {
  console.log("Getting menu")
  const { api_token } = args;
  const foodItems = await FoodItem.find({}).exec();
  console.log(api_token)
  if (api_token) {
    const customer = await Customer.findOne({ api_token }).exec()
    if (!customer) {
      return filterFoodItemPrices(foodItems, 'visitor')
    } else {
      return filterFoodItemPrices(foodItems, customer.status);

    }
  } else {
    return filterFoodItemPrices(foodItems, 'visitor')

  }
}


module.exports = { addMenuItem, getMenu, validateRestaurant }

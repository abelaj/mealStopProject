const { Customer, Restaurant, Order, FoodItem } = require("../models")


const validateCustomer = async (api_token) => {
  try {
    const customer = await Customer.findOne({ api_token }).exec();
    if (!customer) {
      console.log("Invalid auth")
      throw new Error("Unauthorized")
    } else {
      return customer

    }
  } catch (e) {
    throw new Error(e.message)
  }

}


module.exports = { validateCustomer }

/*jshint esversion: 6 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var restaurantSchema = new Schema({
    name: String,
    admin: {
      type:Boolean,
      default: false
    },
    password_hash: String,
    email: String,
    createDate: {
        type: Date,
        default: Date.now()
    },
    api_token: String,
    orders: [],
    rating: [],
    foodItems: [],
    status: String, // vistor, registered, vip
    location: {
        address: {
            street: String,
            city: String,
            state: String
        },
        lat: Number,
        long: Number
    },
});

module.exports = mongoose.model('restaurant',restaurantSchema);

/*jshint esversion: 6 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var foodItemSchema = new Schema({
  name: String,
  description: String,
  price: {
    visitor: Number,
    vip: Number,
    registered: Number,
  },
  rating: Number,
  numberOfRatings: Number
});

module.exports = mongoose.model('foodItem', foodItemSchema);

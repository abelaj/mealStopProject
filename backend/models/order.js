/*jshint esversion: 6 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var orderSchema = new Schema({
  customer: String,
  restaurant: String,
  status: String,
  courier: String,
  contents: [],
});

module.exports = mongoose.model('order',orderSchema);

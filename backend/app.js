/*jshint esversion: 6 */

const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser'); // Middle wear to parse Request Bodies

const { ApolloServer, gql } = require('apollo-server-express');
require('./config');

const { Customer, Restaurant, Order } = require("./models")
const { RestaurantResolver, OrderResolver } = require('./resolvers')
const typeDefs = gql`
    type Restaurant {
      orders: [Order]
      foodItems: [FoodItem]
      name: String

    }
    type Customer {
        id: ID!
        email: String
        name: Name
    }
    type Name {
      first: String
      last: String
    }
    type Order {
      _id: String
      customer: Customer
      status: String
      contents: [FoodItem]

    }
    type FoodItem {
      name: String
      description: String
      price: Int
      rating: Int
      numberOfRatings: Int
    }
    input FoodItemPrice {
      visitor: Int!
      vip: Int!
      registered: Int!
    }
    input FoodItemInput {
      name: String
      description: String
      price: Int
    }
    type Query {
        getCustomers: [Customer]
        getRestaurants: [Restaurant]
        getOrders(api_token: String): [Order]
        getMenu(api_token: String): [FoodItem]
    }

    type Mutation{
      addFoodItem(api_token: String!, name: String!, description: String!, price: FoodItemPrice!): FoodItem
      placeOrder(api_token: String, contents: [FoodItemInput]): Order
      updateOrderStatus(api_token: String, order_id: String, new_status: String): Order
    }
`;

const resolvers = {
  Query: {
    getCustomers: async () => await Customer.find({}).exec(),
    getRestaurants: async () => await Restaurant.find({}).exec(),
    getMenu: RestaurantResolver.getMenu,
    getOrders: OrderResolver.getOrders


  },
  Mutation: {
    addFoodItem: RestaurantResolver.addMenuItem,
    placeOrder: OrderResolver.placeOrder,
    updateOrderStatus: OrderResolver.updateOrderStatus
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.use(cors());
// Configure app to use bodyParser()
// This will let us get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR API
// ===============================================
var apiRouter = require('./routes/api');
// REGISTER ROUTES --------------------------
// All api routes will be prefixed with /api
app.use('/api', apiRouter);

app.listen({ port: 4000, }, () => {
  console.log(`🚀 Graphql Server ready at http://localhost:4000${server.graphqlPath}`);
  console.log(`🚀 API Server ready at http://localhost:4000/api`)
}
);

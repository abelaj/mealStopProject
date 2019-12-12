/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const auth = require("../controller/auth");

router.post('/auth/register/customer', auth.registerCustomer)
router.post('/auth/login/customer', auth.loginCustomer)

router.post('/auth/register/restaurant', auth.registerRestaurant)
router.post('/auth/login/restaurant', auth.loginRestaurant)

module.exports = router;

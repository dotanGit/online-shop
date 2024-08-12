const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order')

router.post('/checkout', orderController.checkout);

module.exports = router;

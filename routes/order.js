const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order')

router.post('/checkout', orderController.checkout);
router.get('/order-details/:orderId', orderController.getOrderDetails);
router.get('/admin/orders', orderController.getAllOrders); // Admin route to get all orders

module.exports = router;

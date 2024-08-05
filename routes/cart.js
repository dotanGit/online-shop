const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const cartController = require('../controllers/cart');

router.get('/', loginController.isLoggedIn, cartController.viewCart);
router.post('/add', loginController.isLoggedIn, cartController.addToCart);

module.exports = router;
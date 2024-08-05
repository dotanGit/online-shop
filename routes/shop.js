const express = require('express');
const router = express.Router();
const shopContorller = require('../controllers/shop')


router.get('/',shopContorller.getProducts);  // This will be /products/


module.exports = router;
const express = require('express');
const router = express.Router();
const shopContorller = require('../controllers/shop')


router.get('/',shopContorller.getProducts); 

router.get('/currency', shopContorller.convertCurrency);

module.exports = router;
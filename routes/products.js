const express = require('express')
const router = express.Router()
const productsContorller = require('../controllers/products')

router.get('/',productsContorller.getProducts);  // This will be /products/
router.post('/',productsContorller.addProduct);  // This will be /products/
router.delete('/:id',productsContorller.deleteProduct);


module.exports = router;
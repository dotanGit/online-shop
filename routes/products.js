const express = require('express')
const router = express.Router()
const productsContorller = require('../controllers/products')

router.get('/',productsContorller.getProducts);  
router.post('/',productsContorller.addProduct);  
router.delete('/:id',productsContorller.deleteProduct);
router.put('/:id',productsContorller.updateProduct); 
router.get('/product/:id',productsContorller.getProductById);


module.exports = router;
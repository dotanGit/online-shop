const express = require('express')
const router = express.Router()
const productsContorller = require('../controllers/products')


router.route('/')
    .get(productsContorller.getProducts)
    .post(productsContorller.addProduct);

router.route('/:id')
    .get(productsContorller.getProduct)
    .patch(productsContorller.updateProduct)
    .delete(productsContorller.deleteProduct)

module.exports = router;
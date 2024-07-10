const express = require('express')
const router = express.Router()
const categoryContorller = require('../controllers/category')

router.get('/', categoryController.getCategories);
router.post('/', categoryController.addCategory);
router.get('/:id/edit', categoryController.editCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;
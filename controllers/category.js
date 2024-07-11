const categoryService = require('../services/category')
const productService = require('../services/products');

const addCategory = async (req,res) => {
    await categoryService.addCategory(req.body.name);
    res.redirect('/categories');
};

const getCategories = async (req,res) => {
    const categories = await categoryService.getAllCategories();
    res.render('category', { categories });
};

const deleteCategory = async (req,res) => {
    const id= req.params.id;
    
    try {
        // Delete all products associated with the category
        await productService.deleteProductsByCategory(id);

        // Delete the category
        await categoryService.deleteCategory(id);
        
        res.status(200).send({ message: 'Category and associated products deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting category and associated products.' });
    }
};

const editCategory = async (req,res) => {
    const id= req.params.id;
    const category = await categoryService.getCategoryById(id);
    res.render('editCategory', { category });
};

const updateCategory = async(req,res) => {
    const id= req.params.id;
    const name = req.body.name;
    await categoryService.updateCategory(id, name);
    res.redirect('/categories');
};

module.exports = {
    addCategory,
    getCategories,
    deleteCategory,
    editCategory,
    updateCategory
};
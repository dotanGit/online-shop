const categoryService = require('../services/category')

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
    await categoryService.deleteCategory(id);
    res.redirect('/categories');
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
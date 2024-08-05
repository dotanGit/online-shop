const productService = require('../services/products');
const categoryService = require('../services/category');

const getProducts = async (req,res) => {
    let products;
    const categories = await categoryService.getAllCategories();
    let selectedCategoryName = 'All Categories';

    if (req.query.category) {
        const selectedCategory = await categoryService.getCategoryById(req.query.category);
        selectedCategoryName = selectedCategory.name;
        products = await productService.getProductsByCategory(req.query.category);
    } else {
        products = await productService.getAllProducts();
    }
    res.render('shop', { products, categories , selectedCategoryName});
};

module.exports = {
    getProducts,
};
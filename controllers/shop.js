const productService = require('../services/products');
const categoryService = require('../services/category');

const getProducts = async (req, res) => {
    let products;
    const categories = await categoryService.getAllCategories();
    let selectedCategoryName = 'All Categories';
    let selectedGender = req.query.gender || '';
    let selectedMaxPrice = req.query.maxPrice || '';

    const filter = {};

    // Filter by category if selected
    if (req.query.category) {
        const selectedCategory = await categoryService.getCategoryById(req.query.category);
        selectedCategoryName = selectedCategory.name;
        filter.category = req.query.category;
    }

    // Filter by gender if selected
    if (selectedGender) {
        filter.gender = selectedGender;
    }

    // Filter by maximum price (convert string price to number for comparison)
    if (selectedMaxPrice) {
        filter.$expr = {
            $lte: [{ $toDouble: "$price" }, parseFloat(selectedMaxPrice)]
        };
    }

    products = await productService.getFilteredProducts(filter);

    res.render('shop', { 
        products, 
        categories, 
        selectedCategoryName, 
        selectedGender, 
        selectedMaxPrice 
    });
};


module.exports = {
    getProducts,
};
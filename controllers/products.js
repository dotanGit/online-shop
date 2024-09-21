const productService = require('../services/products');
const categoryService = require('../services/category');
const { render } = require('ejs');

const addProduct = async (req,res) => {
    await productService.addProduct(req.body.name,
                                    req.body.price,
                                    req.body.category,
                                    req.body.description,
                                    req.body.image,
                                    req.body.gender);
    res.redirect('/products');
};


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
    res.render('products', { products, categories , selectedCategoryName});
};


const deleteProduct = async (req,res) => {
    const id = req.params.id;
    try { 
        await productService.deleteProduct(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};


const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, category, description, image, gender } = req.body;
        console.log(description)
        await productService.updateProduct(id, name, price, category, description, image, gender);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Error updating product', error });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.render('sp', { product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProductById
};
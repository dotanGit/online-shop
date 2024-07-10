const productService = require('../services/products');
const categoryService = require('../services/category');

const addProduct = async (req,res) => {
    const newProduct = await productService.addProduct(req.body.name,req.body.price,req.body.category);
    res.redirect('/products');
};

const getProducts = async (req,res) => {
    let products;
    const categories = await categoryService.getAllCategories();
    if (req.query.category) {
        products = await productService.getProductsByCategory(req.query.category);
    } else {
        products = await productService.getAllProducts();
    }
    res.render('products', { products, categories });
};

const deleteProduct = async (req,res) => {
    const id= req.params.id;
    await productService.deleteProduct(id);
    res.redirect('/products');
};

const editProduct = async (req,res) => {
    const id = req.params.id;
    const product = await productService.getProductById(id);
    const categories = await categoryService.getAllCategories();
    res.render('editProduct', { product, categories });
};

const updateProduct = async(req,res) => {
    const id= req.params.id;
    const { name, price, category } = req.body;
    const updatedProduct = await productService.updateProduct(id, name,price,category);
    res.redirect('/products');
};

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    editProduct,
    updateProduct
};
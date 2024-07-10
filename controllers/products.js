const productService = require('../services/products')

const addProduct = async (req,res) => {
    const newProduct = await productService.addProduct(req.body.name,req.body.price);
    res.redirect('/products');
};

const getProducts = async (req,res) => {
    const products = await productService.getAllProducts();
    res.render('products', { products });
};

const deleteProduct = async (req,res) => {
    const id= req.params.id;
    await productService.deleteProduct(id);
    res.redirect('/products');
};

module.exports = {
    addProduct,
    getProducts,
    deleteProduct
};
const productService = require('../services/products')

const addProduct = async (req,res) => {
    const newProduct = await productService.addProduct(req.body.title,req.body.price);
    res.json(newProduct);
};

const getProducts = async (req,res) => {
    const products = await productService.getProducts();
    res.render('products', { products });
};

const getProduct = async (req,res) => {
    const product = await productService.getProductById(req.params.id);
    if(!product){
        return res.status(404).json({errors : ['Product not found']});
    }
    res.render('product', { product });
};

const updateProduct = async (req,res) => {
    if(!req.body.title || !req.body.price){
        res.status(400).json({
            massage : "title and price is reuired",
        });
    }

    const product = await productService.updateProduct(req.params.id,req.body.title,req.body.price);
    if(!product){
        return res.status(404).json({errors : ['Product not found']});
    }

    res.json(product);
};

const deleteProduct = async (req,res) => {
    const product = productService.getProductById(req.params.id);
    if(!product){
        return res.status(404).json({errors : ['Product not found']}); 
    }

    res.send();
};

module.exports = {
    addProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
};
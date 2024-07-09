const Product = require('../models/products');

const addProduct = async (title,price) => {
    const product = new Product({
        title : title,
        price : price
    });

    return await product.save();
};

const getProductById = async(id) => {
    return await Product.findById(id);
};

const getProducts = async() => {
    return await Product.find({});
};

const updateProduct = async(id,title,price) => {
    const product = await getProductById(id);
    if (!product)
        return null;

    product.title = title;
    product.price = price;
    await product.save();
    return product;
};

const deleteProduct = async(id) => {
    const product = await getProductById(id);
    if (!product)
        return null;

    await product.remove();
    return product;
};

module.exports = {
    addProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct
};
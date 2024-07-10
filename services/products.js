const Product = require('../models/products');

const addProduct = async (name,price) => {
    const product = new Product({
        name : name,
        price : price
    });

    return await product.save();
};


const getAllProducts = async() => {
    return await Product.find({});
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct
};
const Product = require('../models/products');

const addProduct = async (name,price,category,description) => {
    const product = new Product({
        name : name,
        price : price,
        category : category,
        description : description
    });

    return await product.save();
};

const getAllProducts = async() => {
    return await Product.find({}).populate('category');
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

const getProductById = async (id) => {
    return await Product.findById(id).populate('category');
};

const updateProduct = async (id,name,price,category,description) => {
    return await Product.findByIdAndUpdate(id,{name,price,category,description},{new:true}).populate('category');
};

const getProductsByCategory = async (category) => {
    return await Product.find({ category }).populate('category');
};

const deleteProductsByCategory = async (categoryId) => {
    return await Product.deleteMany({ category: categoryId });
};

module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
    updateProduct,
    getProductsByCategory,
    deleteProductsByCategory
};
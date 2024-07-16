const Product = require('../models/products');
const Category = require('../models/category');

const addProduct = async (name,price,category,description) => {
    const product = new Product({
        name : name,
        price : price,
        category : category,
        description : description
    });

    const savedProduct = await product.save();

    await Category.findByIdAndUpdate(category, { $inc: { productCount: 1 } });

    return savedProduct;
};

const getAllProducts = async() => {
    return await Product.find({}).populate('category');
};

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);

    if (product) {
        await Category.findByIdAndUpdate(product.category, { $inc: { productCount: -1 } });
    }

    return product;
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
const Product = require('../models/products');

const addProduct = async (name,price,category) => {
    const product = new Product({
        name : name,
        price : price,
        category : category
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

const updateProduct = async (id,name,price,category) => {
    return await Product.findByIdAndUpdate(id,{name,price,category},{new:true}).populate('category');
}

const getProductsByCategory = async (category) => {
    return await Product.find({ category }).populate('catgeory');
  };

module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
    updateProduct,
    getProductsByCategory
};
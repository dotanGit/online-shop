const Product = require('../models/products');
const Category = require('../models/category');

const addProduct = async (name,price,category,description,image,gender) => {
    const product = new Product({
        name : name,
        price : price,
        category : category,
        description : description,
        image : image,
        gender: gender
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

const updateProduct = async (id, name, price, category, description, image, gender) => {
    // Find the current product before updating to get the current category
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
        throw new Error('Product not found');
    }

    // Check if the category has changed
    const currentCategory = existingProduct.category.toString(); // Convert to string for comparison

    if (currentCategory !== category.toString()) {
        // Decrease the count of the old category only if it's greater than 0
        const oldCategory = await Category.findById(currentCategory);
        if (oldCategory.productCount > 0) {
            await Category.findByIdAndUpdate(currentCategory, { $inc: { productCount: -1 } });
        }

        // Increase the count of the new category
        await Category.findByIdAndUpdate(category, { $inc: { productCount: 1 } });
    }

    // Now update the product with the new data
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, category, description, image, gender },
        { new: true }
    ).populate('category');

    return updatedProduct;
};

const getProductsByCategory = async (category) => {
    return await Product.find({ category }).populate('category');
};

const deleteProductsByCategory = async (categoryId) => {
    return await Product.deleteMany({ category: categoryId });
};

const getFilteredProducts = async (filter) => {
    return await Product.find(filter).populate('category');
};


module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
    updateProduct,
    getProductsByCategory,
    deleteProductsByCategory,
    getFilteredProducts
};
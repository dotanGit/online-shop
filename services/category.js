const Category = require('../models/category');

const addCategory = async (name) => {
    const category = new Category({ 
        name
    });

    return await product.save();
};


const getAllCategories = async() => {
    return await Category.find({});
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

const getCategoryById = async (id) => {
    return await Category.findById(id);
};

const updateCategory = async (id,name) => {
    return await Category.findByIdAndUpdate(id,{name},{new:true});
}

module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory,
    getCategoryById,
    updateCategory
};
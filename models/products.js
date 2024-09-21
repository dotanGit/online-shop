const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema ({
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true
    },
    description: {
        type : String,
        required : true
    },
    image: {  // Store the image file name
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    }
});

module.exports = mongoose.model('Product',Product);
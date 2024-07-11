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
        type: String,
        ref: 'Category', // Reference to the Category model
        required: true
      }

});

module.exports = mongoose.model('Product',Product);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    _id: String,
    password: {
        type: String,
        required: true
    },
    email: String,
    phoneNumber : String,
    address: String,
    cart: [{
        productId: String,
        quantity: Number
      }],
});

module.exports = mongoose.model('User',User);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    items: [{
        productId: String,
        image: String,
        name: String,
        gender: String,
        quantity: String,
        price: String
    }],
    total: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Order',Order);
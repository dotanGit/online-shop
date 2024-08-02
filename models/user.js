const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    _id: String,
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User',User);
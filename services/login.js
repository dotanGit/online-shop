const User = require("../models/User");

async function login(username, password) {
    const user = await User.findOne({ _id: username, password });
    return user 
}

async function register(username, password, email, phoneNumber, address) {
    // Check if the username (_id) already exists
    const userExist = await User.findOne({ _id: username });

    if (!userExist) {
        const user = new User({
            _id: username,  
            password,       
            email,
            phoneNumber,
            address
        });

        await user.save();  
    } else {
        throw new Error('Username already exists');
    }
}

module.exports = { login, register }
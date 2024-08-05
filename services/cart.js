const User = require('../models/User');

async function getCart(userId) {
  const user = await User.findById(userId);
  return user.cart;
}

async function addToCart(userId, productId, quantity) {
  const user = await User.findById(userId);

  const quantityNumber = parseInt(quantity, 10); // Convert quantity to a number

  const cartItem = user.cart.find(item => item.productId === productId);
  if (cartItem) {
    cartItem.quantity += quantityNumber;
  } else {
    user.cart.push({ productId, quantity: quantityNumber });
  }

  await user.save();
}

async function getAccountDetails(userId) {
  const user = await User.findById(userId);
  return {
    username: user._id,
    email: user.email,
    cart: user.cart,
    purchaseHistory: user.purchaseHistory
  };
}

module.exports = {
  getCart,
  addToCart,
  getAccountDetails
};
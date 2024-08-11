const User = require('../models/User');
const Product = require('../models/products');

async function getCart(userId) {
  const user = await User.findById(userId);
  const cartItems = await Promise.all(user.cart.map(async item => {
    const product = await Product.findById(item.productId);
    const productPrice = parseFloat(product.price); // Convert price to a number
    return {
      productId: item.productId,
      quantity: item.quantity,
      productName: product.name,
      productPrice: productPrice,
      description: product.description,
      totalPrice: item.quantity * productPrice
    };
  }));
  return cartItems;
}

async function addToCart(userId, productId, quantity) {
  const user = await User.findById(userId);
  const quantityNumber = parseInt(quantity, 10);

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
    phoneNumber: user.phoneNumber,
    address: user.address,
    cart: user.cart,
    purchaseHistory: user.purchaseHistory
  };
}

module.exports = {
  getCart,
  addToCart,
  getAccountDetails
};

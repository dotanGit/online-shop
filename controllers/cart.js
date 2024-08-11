const cartService = require('../services/cart');

async function viewCart(req, res) {
  const { cartItems, totalCartPrice } = await cartService.getCart(req.session.username);
  res.render('cart', { cartItems , totalCartPrice});
}

async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  try {
    await cartService.addToCart(req.session.username, productId, quantity);
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart' });
  }
}

module.exports = { viewCart, addToCart };

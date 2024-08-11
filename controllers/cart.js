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

async function updateCartQuantity(req, res) {
  const { productId, quantity } = req.body;
  try {
    await cartService.updateCartQuantity(req.session.username, productId, quantity);
    res.status(200).json({ message: 'Quantity updated' });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ message: 'Error updating cart quantity' });
  }
}

module.exports = { 
  viewCart, 
  addToCart,
  updateCartQuantity
 };

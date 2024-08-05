const cartService = require('../services/cart');

async function viewCart(req, res) {
  const cart = await cartService.getCart(req.session.username);
  res.render('cart', { cart });
}

async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  await cartService.addToCart(req.session.username, productId, quantity);
  res.redirect('/cart');
}

module.exports = { viewCart, addToCart };

const cartService = require('../services/cart');

async function viewAccountDetails(req, res) {
  const accountDetails = await cartService.getAccountDetails(req.session.username);
  res.render('account', accountDetails);
}

module.exports = { viewAccountDetails };

const loginService = require("../services/login")
const orderService = require("../services/order")


function isLoggedIn(req, res, next) {
  if (req.session.username) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function loginForm(req, res) { res.render("login", {}) }

function registerForm(req, res) { res.render("register", {}) }

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

async function login(req, res) {
  const { username, password } = req.body;

  const result = await loginService.login(username, password);
  if (result) {
    req.session.username = username;
    req.session.email = result.email;
    req.session.phoneNumber = result.phoneNumber;
    req.session.address = result.address;
    res.redirect('/');
  } else {
    res.redirect('/login?error=1');
  }
}


async function register(req, res) {
  const { username, password, email, phoneNumber, address } = req.body;

  try {
      await loginService.register(username, password, email, phoneNumber, address);

      req.session.username = username;
      req.session.email = email;
      req.session.phoneNumber = phoneNumber;
      req.session.address = address;
      
      res.redirect('/');
  } catch (e) {
      // Redirect back to registration page with an error message
      res.redirect('/register?error=1&message=' + encodeURIComponent(e.message));
  }
}


async function register(req, res) {
  const { username, password, email, phoneNumber, address } = req.body;

  try {
      await loginService.register(username, password, email, phoneNumber, address);

      req.session.username = username;
      req.session.email = email;
      req.session.phoneNumber = phoneNumber;
      req.session.address = address;
      res.redirect('/');
  } catch (e) {
      // Redirect back to registration page with an error message
      res.redirect('/login/register?error=' + encodeURIComponent(e.message));
  }
}


async function accountDetails(req, res) {
  const userId = req.session.username;

  try {
      // Fetch the order history using the service
      const orders = await orderService.getOrderHistoryByUserId(userId);

      // Render the account page with user info and orders
      res.render('account', {
          username: req.session.username,
          email: req.session.email,
          phoneNumber: req.session.phoneNumber,
          address: req.session.address,
          orders: orders  // Pass the orders to the view
      });
  } catch (e) {
      console.error('Error fetching account details:', e);
      res.redirect('/login/register?error=' + encodeURIComponent(e.message));
  }
}


module.exports = {
  login,
  loginForm,
  register,
  registerForm,
  logout,
  isLoggedIn,
  accountDetails
}
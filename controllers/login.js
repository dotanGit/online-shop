const loginService = require("../services/login")


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

module.exports = {
  login,
  // Other functions...
};



async function register(req, res) {
  const { username, password, email, phoneNumber, address } = req.body


  try {
    await loginService.register(username, password, email, phoneNumber, address)    
    req.session.username = username
    res.redirect('/')
  }
  catch (e) { 
    res.redirect('/register?error=1')
  }    
}

function accountDetails(req, res) {
  console.log("Account details:", req.session); // Debug statement
  res.render("account", { username: req.session.username, email: req.session.email, phoneNumber: req.session.phoneNumber, address: req.session.address });
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
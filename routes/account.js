const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");

router.get('/logout', loginController.logout);
router.get('/account', loginController.isLoggedIn, loginController.accountDetails);

module.exports = router;

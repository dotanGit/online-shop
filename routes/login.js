const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");

router.get("/register", loginController.registerForm);
router.post("/register", loginController.register);
router.get("/", loginController.loginForm);
router.post("/", loginController.login);

module.exports = router;

const express = require("express");

const router = express.Router();

const userController = require('../controllers/auth')

router.route("/").get(userController.getUsers);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;

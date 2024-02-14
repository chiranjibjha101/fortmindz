const router = require("express").Router();
const passport = require("passport");
const { register, login } = require("../controllers/AuthController");

router.post("/register", register);
router.post("/login", login);

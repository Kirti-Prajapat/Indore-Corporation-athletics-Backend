const express = require("express");

const { SignupUser, SigninUser} = require("../Controller/userController");

const router = express.Router();

router.post("/signup", SignupUser);
router.post("/signin", SigninUser);

module.exports = router;
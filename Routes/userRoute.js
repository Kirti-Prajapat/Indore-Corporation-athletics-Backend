const express = require("express");

const { SignupUser, SigninUser} = require("../Controller/userController");


// const verifyAdmin =require("../Middleware/verifyAdmin")

const router = express.Router();

//  for user
router.post("/signup", SignupUser);
router.post("/signin", SigninUser);




module.exports = router;
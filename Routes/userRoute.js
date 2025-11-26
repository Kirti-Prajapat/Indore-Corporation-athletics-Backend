const express = require("express");

const { SignupUser, SigninUser, registerAthlete,
  getAllRegistrations} = require("../Controller/userController");


// const verifyAdmin =require("../Middleware/verifyAdmin")

const router = express.Router();

//  for user
router.post("/signup", SignupUser);
router.post("/signin", SigninUser);

router.post("/register", registerAthlete);

// GET - Fetch all registrations
router.get("/all", getAllRegistrations);


module.exports = router;
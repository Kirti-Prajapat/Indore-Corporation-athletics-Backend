const express = require("express");
const { SignupUser, SigninUser, registerAthlete, getAllRegistrations } = require("../Controller/userController");
// const { protect, checkRole } = require("../Middleware/auth");

const router = express.Router();

// Public routes
router.post("/signup", SignupUser);
router.post("/signin", SigninUser);


router.post("/register", registerAthlete); // Normal user
// GET - Fetch all registrations
router.get("/all", getAllRegistrations);   // Admin-only

module.exports = router;

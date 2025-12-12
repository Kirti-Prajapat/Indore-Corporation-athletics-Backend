const express = require("express");
const { signupAdmin, signinAdmin } = require("../Controller/adminController");
const { protect, checkRole } = require("../Middleware/auth");

const router = express.Router();

// Public routes
router.post("/signupadmin", signupAdmin);
router.post("/signinadmin",signinAdmin);

// Admin-only protected route
router.get("/corporation-admin", protect, checkRole("admin"), (req, res) => {
    res.json({ message: "Admin Access Granted" });
});

module.exports = router;

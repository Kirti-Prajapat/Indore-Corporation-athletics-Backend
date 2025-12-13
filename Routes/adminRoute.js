const express = require("express");
const { signupAdmin, signinAdmin } = require("../Controller/adminController");
const { protect, checkRole } = require("../Middleware/auth");

const router = express.Router();

router.post("/signupadmin", signupAdmin);
router.post("/signinadmin", signinAdmin);

// Protected admin route
router.get("/corporation-admin", protect, checkRole("admin"), (req, res) => {
  res.json({ message: "Admin Access Granted" });
});

module.exports = router;

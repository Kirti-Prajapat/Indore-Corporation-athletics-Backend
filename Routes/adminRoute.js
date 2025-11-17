const express = require("express");

const {verifyAdmin, signupAdmin, signinAdmin} =require("../Controller/adminController");

const router = express.Router();

//  For admin

router.post("/signupadmin", signupAdmin);
router.post("/signinadmin", signinAdmin);
router.get("/corporation-admin", verifyAdmin, (req, res) => {
    res.json({ message: "Admin Access Granted" });
});


module.exports = router;
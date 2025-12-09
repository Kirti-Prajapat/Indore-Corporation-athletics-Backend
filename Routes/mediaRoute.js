const express = require("express");
const router = express.Router();
const { protect, checkRole } = require("../Middleware/auth");
const { upload, uploadFile, listFiles } = require("../Controller/mediaController");

// Upload file (Admin only)
// router.post("/upload", upload.single("file"), uploadFile);
router.post("/upload", protect, checkRole("admin"), upload.single("file"), uploadFile);

// List files (Logged-in users)
router.get("/uploads", protect, listFiles);

module.exports = router;

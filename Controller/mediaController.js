const multer = require("multer");
const path = require("path");
console.log(path.join(__dirname, "..", "uploads"));
const fs = require("fs");

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // correct
  },
});

const upload = multer({ storage });

// Upload File (Admin Only)
const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Choose the file!" });

  res.json({
    message: "File uploaded ho gaya!",
    fileUrl: "/uploads/" + req.file.filename,
  });
};

// List Files (All Logged-in Users)
const listFiles = (req, res) => {
  const dir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(dir)) return res.json([]);

  const files = fs.readdirSync(dir).map((f) => "/uploads/" + f);
  res.json(files);
};

module.exports = { upload, uploadFile, listFiles };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../Model/AdminModel");

// Allowed admin email
const ADMIN_EMAIL = "myadmin@gmail.com";
const ADMIN_SECRET = process.env.ADMIN_SECRET;

// -------------------- ADMIN SIGNUP --------------------
const signupAdmin = async (req, res) => {
  try {
    const { email, password, secretKey } = req.body;

    // console.log("SIGNUP -> ADMIN_SECRET:", ADMIN_SECRET);

    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "You are not allowed to signup as admin." });
    }

    if (secretKey !== ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid Secret Key" });
    }

    const exist = await Admin.findOne({ email });
    if (exist) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashed });
    await admin.save();

    res.json({ message: "Admin Signup Successful" });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -------------------- ADMIN LOGIN --------------------
const signinAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log("LOGIN -> JWT_SECRET:", process.env.JWT_SECRET);

    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "Invalid Admin Email" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    console.log("TOKEN GENERATED:", token);

    res.json({
      message: "Login Success",
      user: { role: "admin", email: admin.email },
      token
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = { signupAdmin, signinAdmin };

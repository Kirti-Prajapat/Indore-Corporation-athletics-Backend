const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {Admin} = require("../Model/AdminModel")

// Signup controller

const ADMIN_EMAIL = "myadmin@gmail.com";
const ADMIN_SECRET = "SuperSecretKey123";

const signupAdmin = async (req, res) => {
  try {
    const { email, password, secretKey } = req.body;

    // Check if email is allowed
    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "You are not allowed to signup as admin." });
    }

    //  Check secret key
    if (secretKey !== ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid Secret Key" });
    }

    //  Check if admin exists
    const exist = await Admin.findOne({ email });
    if (exist) return res.status(400).json({ message: "Admin already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const admin = new Admin({ email, password: hashed });
    await admin.save();

    res.json({ message: "Admin Signup Successful" });

  } catch (err) {
    res.status(500).json({ message: "Internal Error" });
  }
};


// Signin controller

const signinAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "Invalid Admin Email" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign({ id: admin._id }, "ADMIN_TOKEN_SECRET");

    res.json({
      message: "Login Success",
      user: { role: "admin", email: admin.email },
      token,
    });

  } catch (err) {
    res.status(500).json({ message: "Internal Error" });
  }
};


// Middleware: Verify admin


const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "ADMIN_TOKEN_SECRET", (err, decoded) => {
      if (err) return res.status(401).json({ message: "Invalid token" });

      req.user = decoded;
      next();
    });

  } catch (err) {
    res.status(500).json({ message: "Error verifying token" });
  }
};

// const verifyAdmin = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, "our Secret key");
//     if (decoded.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Admin only." });
//     }

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };



module.exports = {signupAdmin,signinAdmin, verifyAdmin};

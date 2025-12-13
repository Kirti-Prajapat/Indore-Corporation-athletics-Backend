const jwt = require("jsonwebtoken");
const {User} = require("../Model/userModel");

// -------------------- token protect --------------------
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const token = authHeader.split(" ")[1];
    // console.log("TOKEN RECEIVED:", token);
    // console.log("VERIFY -> JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("DECODED:", decoded);

    // Admin token also contains id, so user lookup only for normal users
    const user = await User.findById(decoded.id).select("-password");

    req.user = decoded.role === "admin" ? { role: "admin" } : user;

    next();

  } catch (error) {
    console.log("TOKEN ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

// -------------------- Role check --------------------
const checkRole = (role) => {
  return (req, res, next) => {
    console.log("CHECK ROLE -> required:", role, " user:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied!" });
    }

    next();
  };
};

module.exports = { protect, checkRole };

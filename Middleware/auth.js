const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');


//  Only logged-in users
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'No token provided!' });
    }

  
    const token = authHeader.split(" ")[1];
    console.log("TOKEN RECEIVED:", token);
    console.log("SECRET USED:", process.env.JWT_SECRET);

      // JWT verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User ko DB se find karo (password hata ke)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found!' });

    req.user = user;
    next();
  } catch (error) {
    console.error("Token Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

//  Role check
const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied! Admins only." });
    }
    next();
  };
};

module.exports = { protect, checkRole };

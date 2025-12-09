const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');


// 1️⃣ Only logged-in users
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Please login first!' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found!' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token!" });
  }
};

// 2️⃣ Role check
const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "firstly login!" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied!" });
    }
    next();
  };
};

module.exports = { protect, checkRole };

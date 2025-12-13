const express = require("express");
const { 
  addEvent, updateEvent, deleteEvent, 
  getAllEvents, getLiveEvent, toggleLiveEvent 
} = require("../Controller/eventController");
const { protect, checkRole } = require("../Middleware/auth");

const router = express.Router();

router.get("/getEvent", getAllEvents);

// Admin Only
router.post("/add", protect, checkRole("admin"), addEvent);
router.put("/update/:id", protect, checkRole("admin"), updateEvent);
router.delete("/delete/:id", protect, checkRole("admin"), deleteEvent);
router.put("/toggleLive/:id", protect, checkRole("admin"), toggleLiveEvent);

// User-only access
router.get("/live/:id", protect, checkRole("user"), getLiveEvent);

module.exports = router;

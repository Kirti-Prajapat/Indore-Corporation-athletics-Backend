const express = require("express");
const { addEvent, updateEvent, deleteEvent, getAllEvents, getLiveEvent, toggleLiveEvent } = require("../Controller/eventController");
const { protect, checkRole } = require("../Middleware/auth");

const router = express.Router();

router.get("/getEvent", getAllEvents); // public, sab dekh sakte hain

// Admin-only routes
router.post("/add", protect, checkRole("admin"), addEvent);
router.put("/update/:id", protect, checkRole("admin"), updateEvent);
router.delete("/delete/:id", protect, checkRole("admin"), deleteEvent);

// Admin toggles live
router.put("/toggle-Live/:id", protect, checkRole("admin"), toggleLiveEvent);
// Live event (only registered users)
// router.get("/live/:id", protect, checkRole("user"), getLiveEvent);

module.exports = router;

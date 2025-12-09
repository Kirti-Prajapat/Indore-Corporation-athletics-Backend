const express = require("express");
const router = express.Router();
const Event = require("../Model/eventModel"); 
const { protect } = require("../Middleware/auth");

// Get live video for user
router.get("/:eventId", protect, async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event || !event.liveURL) {
      return res.status(404).json({ message: "Live video not found" });
    }

    res.json({ liveURL: event.liveURL });
  } catch (error) {
    res.status(500).json({ message: "Error fetching live video" });
  }
});

module.exports = router;

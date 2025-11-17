const express = require("express");

const {addEvent, updateEvent, deleteEvent, getAllEvents} = require("../Controller/eventController");

const router = express.Router();

router.get("/getEvent", getAllEvents);
router.post("/add", addEvent);
router.put("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);

module.exports = router;
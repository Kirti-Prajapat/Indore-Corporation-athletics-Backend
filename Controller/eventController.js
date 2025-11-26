const { Event } = require("../Model/eventModel");

// Add new event
const addEvent = async (req, res) => {
  try {
    const { title, description, imageUrl, videoUrl } = req.body;
    const newEvent = new Event({ title, description, imageUrl, videoUrl });
    await newEvent.save();
    res.status(201).json({ message: "Event Added Successfully", newEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Event updated successfully", updatedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addEvent, updateEvent, deleteEvent, getAllEvents}

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


// Get live video for a specific event (only for logged-in users)
const getLiveEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: "Event Not Found" });


    // Check if event is live
    if (!event.isLive) {
      return res.status(403).json({ message: "Event is not live currently!" });
    }

    //  Only logged-in users can access videoUrl
    res.json({
      title: event.title,
      videoUrl: event.videoUrl,
      liveURL: event.liveURL
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Toggle live URL (Admin only)
const toggleLiveEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { liveURL } = req.body;

    if (!liveURL) {
      return res.status(400).json({ message: "liveURL is required" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { liveURL, isLive: true },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Live URL saved successfully", updatedEvent });
  } catch (error) {
    console.error("Toggle Live Event Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {addEvent, updateEvent, deleteEvent, getAllEvents,  getLiveEvent, toggleLiveEvent}

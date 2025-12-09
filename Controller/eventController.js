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


// 

const toggleLiveEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { liveURL } = req.body;

    const updated = await Event.findByIdAndUpdate(
      id,
      { liveURL:`https://www.youtube.com/embed/UCJKNaCURBPOp8jm?autoplay=1`, isLive: true },
      { new: true }
    );

    res.json({ message: "Live URL Saved", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to save live URL" });
  }
};


module.exports = {addEvent, updateEvent, deleteEvent, getAllEvents,  getLiveEvent, toggleLiveEvent}

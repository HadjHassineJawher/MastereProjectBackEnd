const { Event } = require("../models/event");

/**
 * Get all Events.
 */

const getAllEvents = async (req, res) => {
  try {
    const EventsList = await Event.find().populate("sessions");
    let AllEvents = EventsList.map((list) => {
      return list;
    });
    res.status(200).json({ message: "Operation Succeded", AllEvents });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Get a Single Event.
 */

const getSingleEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findById(id).populate("sessions");
    res.status(200).json({ message: "Operation Succeded", event });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found with this Id.",
    });
    throw err;
  }
};

/**
 * Store a New Event.
 */

const NewEvent = async (req, res) => {
  try {
    var event = new Event({
      name: req.body.name,
      description: req.body.description,
      sessions: req.body.sessions,
      date_deb: req.body.date_deb,
      date_fin: req.body.date_fin,
      nb_place: req.body.nb_place,
      state: req.body.state,
    });
    const newEvent = await event.save();
    res.status(201).json({ message: "Operation Succeded", newEvent });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Delete an Event.
 */

const DeleteEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedEvent = await Event.findByIdAndRemove(id);
    res.status(200).json({ message: "Operation Succeded", deletedEvent });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Update an existing Event.
 */

const UpdateEvent = async (req, res) => {
  try {
    var newEventInfo = {
      name: req.body.name,
      description: req.body.description,
      sessions: req.body.sessions,
      date_deb: req.body.date_deb,
      date_fin: req.body.date_fin,
      nb_place: req.body.nb_place,
      state: req.body.state,
    };

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: newEventInfo },
      { new: true }
    );

    res.status(200).json({ message: "Operation Succeded", updatedEvent });
  } catch (err) {
    res.status(304).json({ message: "Operation to Update Failed." });
    throw err;
  }
};

/**
 * Cancel an Event.
 */

const cancelEvent = async (req, res) => {
  try {
    const canceledEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { state: "CANCELED" } },
      { new: true }
    );
    res.status(200).json({ message: "Operation Succeded", canceledEvent });
  } catch (err) {
    res.status(500).json({ message: "No Data to update." });
    throw err;
  }
};

/**
 * UnCancel an Event.
 */
const UncancelEvent = async (req, res) => {
  try {
    const uncanceledEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { state: "ACTIVE" } },
      { new: true }
    );
    res.status(200).json({ message: "Operation Succeded", uncanceledEvent });
  } catch (err) {
    res.status(500).json({ message: "No Data to update." });
    throw err;
  }
};

/**
 * All Canceled Events.
 */
const canceledEvents = async (req, res) => {
  try {
    const CanceledEvent = await Event.find({ state: "CANCELED" }).populate(
      "sessions"
    );

    let AllcanceledEvents = CanceledEvent.map((list) => {
      return list;
    });

    res.status(200).json({ message: "Operation Succeded", AllcanceledEvents });
  } catch (err) {
    res.status(500).json({ message: "No Data to update." });
    throw err;
  }
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  NewEvent,
  cancelEvent,
  UncancelEvent,
  UpdateEvent,
  DeleteEvent,
  canceledEvents,
};

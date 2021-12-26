const { Session } = require("../models/session");

/**
 * Get all Sessions.
 */

const getAllSessions = async (req, res) => {
  try {
    const SessionsList = await Session.find().populate("speakers");
    res.status(200).json({ message: "Operation Succeded", SessionsList });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Get a Single Session.
 */

const getSingleSession = async (req, res) => {
  const id = req.params.id;
  try {
    const session = await Session.findById(id).populate("speakers");
    res.status(200).json({ message: "Operation Succeded", session });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found with this Id.",
    });
    throw err;
  }
};

/**
 * Store a New Session.
 */

const NewSession = async (req, res) => {
  try {
    var session = new Session({
      name: req.body.name,
      description: req.body.description,
      h_deb: req.body.h_deb,
      h_fin: req.body.h_fin,
      speakers: req.body.speakers,
    });
    const newSession = await session.save();
    res.status(201).json({ message: "Operation Succeded", newSession });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Update an existing Session.
 */

const UpdateSession = async (req, res) => {
  const id = req.params.id;
  try {
    var newSessionInfo = {
      name: req.body.name,
      description: req.body.description,
      h_deb: req.body.h_deb,
      h_fin: req.body.h_fin,
      speakers: req.body.speakers,
    };

    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { $set: newSessionInfo },
      { new: true }
    ).populate("speakers");

    res.status(200).json({ message: "Operation Succeded", updatedSession });
  } catch (err) {
    res.status(304);
    throw err;
  }
};

/**
 * Delete Session.
 */

const DeleteSession = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSession = await Session.findByIdAndRemove(id);
    res.status(200).json({ message: "Operation Succeded", deletedSession });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

module.exports = {
  getAllSessions,
  getSingleSession,
  NewSession,
  UpdateSession,
  DeleteSession,
};

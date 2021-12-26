const { Experience } = require("../models/experience");

/**
 * Get all Experience.
 */

const getAllExperience = async (req, res) => {
  try {
    const ExperienceList = await Experience.find().populate("user");
    res.status(200).json({ message: "Operation Succeded", ExperienceList });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found. ",
    });
    throw err;
  }
};

/**
 * Get a Single Experience.
 */

const getSingleExperience = async (req, res) => {
  const id = req.params.id;
  try {
    const experience = await Experience.findById(id).populate("user");
    res.status(200).json({ message: "Operation Succeded", experience });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found with this Id. ",
    });
    throw err;
  }
};

/**
 * Store a New Experience.
 */

const NewExperience = async (req, res) => {
  try {
    var experience = new Experience({
      poste: req.body.poste,
      societe: req.body.societe,
      date_deb: req.body.date_deb,
      date_fin: req.body.date_fin,
      user: req.body.user,
    });
    const newexperience = await experience.save();
    res.status(201).json({ message: "Operation Succeded", newexperience });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Update an existing Experience.
 */

const UpdateExperience = async (req, res) => {
  try {
    var newexperienceInfo = {
      poste: req.body.poste,
      societe: req.body.societe,
      date_deb: req.body.date_deb,
      date_fin: req.body.date_fin,
      user: req.body.user,
    };

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      { $set: newexperienceInfo },
      { new: true }
    ).populate("user");

    res.status(200).json({ message: "Operation Succeded", updatedExperience });
  } catch (err) {
    res.status(304);
    throw err;
  }
};

/**
 * Delete an Experience.
 */

const DeleteExperience = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedexperience = await Experience.findByIdAndRemove(id).populate(
      "user"
    );
    res.status(200).json({ message: "Operation Succeded", deletedexperience });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

module.exports = {
  getAllExperience,
  getSingleExperience,
  NewExperience,
  UpdateExperience,
  DeleteExperience,
};

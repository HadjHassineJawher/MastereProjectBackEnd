const { Diplome } = require("../models/diplome");

/**
 * Get all Dipolome.
 */

const getAllDiplome = async (req, res) => {
  try {
    const DiplomesList = await Diplome.find();
    let AllDiplomes = DiplomesList.map((diplist) => {
      return diplist;
    });
    res.status(200).json({ message: "Operation Succeded", AllDiplomes });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Get a Single Dipolome.
 */

const getSingleDiplome = async (req, res) => {
  const id = req.params.id;
  try {
    const diplome = await Diplome.findById(id);
    res.status(200).json({ message: "Operation Succeded", diplome });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found with this Id.",
    });
    throw err;
  }
};

/**
 * Store a New Dipolome.
 */

const NewDiplome = async (req, res) => {
  try {
    var diplome = new Diplome({
      name: req.body.name,
      date: req.body.date,
      specialite: req.body.specialite,
    });
    const newdiplome = await diplome.save();
    res.status(201).json({ message: "Operation Succeded", newdiplome });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Delete an existing Dipolome.
 */

const DeleteDiplome = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDipolome = await Diplome.findByIdAndRemove(id);
    res.status(200).json({ message: "Operation Succeded", deletedDipolome });
  } catch (err) {
    res.status(500).json({ message: "No Data to Delete." });
    throw err;
  }
};

/**
 * Update an existing Dipolome.
 */

const UpdateDipolome = async (req, res) => {
  try {
    var newdiplomeInfo = {
      name: req.body.name,
      date: req.body.date,
      specialite: req.body.specialite,
    };

    const updatediplome = await Diplome.findByIdAndUpdate(
      req.params.id,
      { $set: newdiplomeInfo },
      { new: true }
    );
    res.status(200).json({ message: "Operation Succeded", updatediplome });
  } catch (err) {
    res.status(304).json({ message: "Operation to Update Failed." });
    throw err;
  }
};

module.exports = {
  getAllDiplome,
  getSingleDiplome,
  NewDiplome,
  DeleteDiplome,
  UpdateDipolome,
};

const { Portfolio } = require("../models/portfolio");

/**
 * Get all Portfolio.
 */

const getAllPortfolio = async (req, res) => {
  try {
    const PortfilioList = await Portfolio.find()
      .populate("user")
      .populate("experience")
      .populate("diplome");

    let AllPortfolios = PortfilioList.map((diplist) => {
      return diplist;
    });

    res.status(200).json({ message: "Operation Succeded", AllPortfolios });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found. ",
    });
    throw err;
  }
};

/**
 * Get a Single Portfolio.
 */

const getSinglePortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    const portfolio = await Portfolio.findById(id)
      .populate("user")
      .populate("experience")
      .populate("diplome");
    res.status(200).json({ message: "Operation Succeded", portfolio });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found with this Id. ",
    });
    throw err;
  }
};

/**
 * Store a new Portfolio.
 */

const addNewProtfolio = async (req, res) => {
  try {
    var portfolio = new Portfolio({
      url_img: req.file.path,
      user: req.body.user,
      diplome: req.body.diplome,
      experience: req.body.experience,
    });

    const newportfolio = await portfolio.save();
    res.status(201).json({ message: "Operation Succeded", newportfolio });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Update an existing Portfolio.
 */

const UpdatePortfolio = async (req, res) => {
  const id = req.params.id;
  try {
    var newportfolioInfo = {
      url_img: req.body.url_img,
      user: req.body.user,
      diplome: req.body.diplome,
      experience: req.body.experience,
    };

    const updateportfolio = await Portfolio.findByIdAndUpdate(
      id,
      { $set: newportfolioInfo },
      { new: true }
    )
      .populate("user")
      .populate("experience")
      .populate("diplome");

    res.status(200).json({ message: "Operation Succeded", updateportfolio });
  } catch (err) {
    res.status(304);
    throw err;
  }
};

/**
 * Delete a Portfolio.
 */

const DeletePorfolio = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPortfolio = await Portfolio.findByIdAndRemove(id);
    res.status(200).json({ message: "Operation Succeded", deletedPortfolio });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

module.exports = {
  getAllPortfolio,
  getSinglePortfolio,
  addNewProtfolio,
  UpdatePortfolio,
  DeletePorfolio,
};

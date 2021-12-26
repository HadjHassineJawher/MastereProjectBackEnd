const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const JWT_KEY = process.env.JWT_KEY;
const { EmailMessage } = require("../middlewares/mailer");

/**
 * Get all Single User.
 */

const getAllUsers = async (req, res) => {
  try {
    const UsersList = await User.find();
    let AllUsers = UsersList.map((list) => {
      return list;
    });
    res.status(200).json({ message: "Operation Succeded", AllUsers });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Get a Single User.
 */

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({ message: "Operation Succeded", user });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found with this Id.",
    });
    throw err;
  }
};

/**
 * Store a New User.
 */

const NewUser = async (req, res) => {
  let Email = req.body.email;

  const userExists = await User.findOne({
    email: Email,
  });

  if (userExists) {
    res.status(409).json({ message: "User exists already try to Log In" });
  }

  const HashPassword = await bcrypt.hash(req.body.pwd, 15);
  try {
    var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      adresse: req.body.adresse,
      email: Email,
      pwd: HashPassword,
      profile: req.body.profile,
      status: req.body.status,
    });

    const newUser = await user.save();
    EmailMessage(Email);
    res.status(201).json({ message: "Operation Succeded", newUser });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Update an existing User.
 */

const UpdateUser = async (req, res) => {
  const HashPassword = await bcrypt.hash(req.body.pwd, 15);
  try {
    var newUserInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      adresse: req.body.adresse,
      email: req.body.email,
      pwd: HashPassword,
      profile: req.body.profile,
      status: req.body.status,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUserInfo },
      { new: true }
    );

    res.status(200).json({ message: "Operation Succeded", updatedUser });
  } catch (err) {
    res.status(304).json({ message: "Operation to Update Failed." });
    throw err;
  }
};

/**
 * Delete a User.
 */

const DeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndRemove(id);
    res.status(200).json({ message: "Operation Succeded", deletedUser });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * User Authentification.
 */

const UserLogIn = async (req, res) => {
  try {
    const Email = req.body.Email;
    const Password = req.body.Password;

    const user = await User.findOne({ email: Email });
    if (!user) {
      res
        .status(409)
        .json({ Message: "The email address doesn't match any account." });
      return;
    }

    const isEqual = await bcrypt.compare(Password, user.pwd);

    if (!isEqual) {
      res.status(409).json({ Message: "The passsword is incorrect .. !" });
      return;
    }

    const token = jwt.sign(
      {
        UserId: user._id,
        Email: user.email,
        FirstName: user.firstName,
        LastName: user.lastName,
      },
      `${JWT_KEY}`,
      { expiresIn: "3h" }
    );

    const SecretInfo = {
      UserId: user._id,
      FirstName: user.firstName,
      LastName: user.lastName,
      token: token,
      tokenExpiration: 3,
    };

    res.status(200).json({ message: "Login Succeded", SecretInfo });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  NewUser,
  UpdateUser,
  DeleteUser,
  UserLogIn,
};

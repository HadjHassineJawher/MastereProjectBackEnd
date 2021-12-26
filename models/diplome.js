const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiplomeSchema = new Schema(
  {
    name: { type: String, require: true },
    date: { type: Date, require: true },
    specialite: { type: String, require: true },
  },
  { timestamps: true }
);

const Diplome = mongoose.model("Diplome", DiplomeSchema);
module.exports = { Diplome };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema(
  {
    poste: { type: String, require: true },
    societe: { type: String, require: true },
    date_deb: { type: Date, require: true },
    date_fin: { type: Date, require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", ExperienceSchema);
module.exports = { Experience };

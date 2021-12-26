const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema(
  {
    url_img: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    diplome: [
      {
        type: Schema.Types.ObjectId,
        ref: "Diplome",
        require: true,
      },
    ],
    experience: [
      {
        type: Schema.Types.ObjectId,
        ref: "Experience",
        require: true,
      },
    ],
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
module.exports = { Portfolio };

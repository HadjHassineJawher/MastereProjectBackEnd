const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    h_deb: { type: String, required: true },
    h_fin: { type: String, required: true },
    speakers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
    ],
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);
module.exports = { Session };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    date_deb: { type: Date, require: true },
    date_fin: { type: Date, require: true },
    description: { type: String, require: true },
    room:{ type: String },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
        require: true,
      },
    ],
    nb_place: { type: Number, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);
module.exports = { Event };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    adresse: { type: String, required: true },
    email: {
      type: String,
      require: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    pwd: { type: String, require: true },
    profile: { type: String, require: true },
    // portfolio: { type: Schema.Types.ObjectId, ref: "Portfolio" },
    status: { type: String, require: true },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = { User };

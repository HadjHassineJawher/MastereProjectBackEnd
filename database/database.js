const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@mpdameventscluster.mwy52.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("Connection To MpdamEvents DataBase Succeeded.");
  } catch (err) {
    console.log("Error in MpdamEvents DataBase Connection : " + err);
  }
};

module.exports = {
  connectDB,
};

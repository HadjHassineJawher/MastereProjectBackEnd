const express = require("express");
const { connectDB } = require("./database/database");
const app = express();
const Routes = require("./routes/routes");

require("dotenv").config({ path: "./config/.env" });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/Api/assets//images//", express.static("assets/images"));
app.use("/Api", Routes);
app.get("/", (req, res) => {
  res.send("<center> MPDAM Project Server is Running Fine .. 👏 </center>");
});

const PORT = process.env.PORT;
const Server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`The Express Server is Running on Port : ${PORT}`);
});

module.exports = Server;

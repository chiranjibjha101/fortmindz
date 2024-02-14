const mongoose = require("mongoose");
require("dotenv").config();
const db = {};
db.connect = async function () {
  await mongoose.connect(process.env.URL);
  console.log("Connected to database");
};
db.User = require("./User")(mongoose);
db.Appointment = require("./Appointment")(mongoose);
db.Salon = require("./Salon")(mongoose);
db.Service = require("./Service")(mongoose);
db.Beautician = require("./Beautician")(mongoose);
module.exports = db;

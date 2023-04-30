const mongoose = require("mongoose");

require("dotenv").config();
mongoose.set("strictQuery", false);
const connection = mongoose.connect("mongodb+srv://alok:alok@cluster0.f3ovlda.mongodb.net/brandradiator?retryWrites=true&w=majority");
module.exports = {
  connection
};

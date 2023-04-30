const mongoose = require("mongoose");

require("dotenv").config();
mongoose.set("strictQuery", false);
const connection = mongoose.connect(process.env.MONGOOSE_URL);
module.exports = {
  connection
};

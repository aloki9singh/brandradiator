const mongoose = require("mongoose");

const homeSchema = mongoose.Schema(
  {
    image: { type: String, required: true },
    heading: { type: String, required: true },
    details: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const HomeModel = mongoose.model("Home", homeSchema);

module.exports = {
  HomeModel,
};

const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema(
  {
    who_we_are: { type: String, required: true },
    founders: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const AboutModel = mongoose.model("About", AboutSchema);

module.exports = {
  AboutModel,
};

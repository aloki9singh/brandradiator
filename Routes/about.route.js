const express = require("express");
const { AboutModel } = require("../model/about.model");

const aboutRouter = express.Router();
require("dotenv").config();

aboutRouter.get("/about", async (req, res) => {
  try {
    const about = await AboutModel.find();
    res.send(about);
  } catch (err) {
    res.send({ err: err });
  }
});

aboutRouter.post("/about", async (req, res) => {
  try {
    const about = new AboutModel(req.body);
    await about.save();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.send({
      error: error,
    });
  }
});

module.exports = {
  aboutRouter,
};

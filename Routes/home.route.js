const express = require("express");
const { HomeModel } = require("../model/home.model");

const homeRouter = express.Router();
require("dotenv").config();

homeRouter.get("/home", async (req, res) => {
  try {
    const home = await HomeModel.find();
    res.status(201).send(home);
  } catch (err) {
    res.status(404).send({ err: err });
  }
});

// get single post
homeRouter.get(`/home/:id`, async (req, res) => {
  const id = req.params.id;
  try {
    let data = await HomeModel.findById({ _id: id });
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(404).send({
      error: error,
    });
  }
});

//post data
homeRouter.post("/home", async (req, res) => {
  try {
    const home = new HomeModel(req.body);
    await home.save();

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      error: error,
    });
  }
});
//delete data
homeRouter.delete(`/home/:id`, async (req, res) => {
  const id = req.params.id;
  try {
    await HomeModel.findByIdAndDelete({ _id: id });

    res.status(201).json({
      success: true,
      msg: "Post is deleted Successfully ",
    });
  } catch (error) {
    res.status(404).send({
      error: error,
    });
  }
});
homeRouter.patch(`/home/:id`, async (req, res) => {
  const id = req.params.id;
  try {
    await HomeModel.findByIdAndUpdate({ _id: id }, req.body);

    res.status(201).json({
      success: true,
      msg: "Post is Updated Successfully ",
    });
  } catch (error) {
    res.status(404).send({
      error: error,
    });
  }
});

module.exports = {
  homeRouter,
};

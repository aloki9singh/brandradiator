const express = require("express");
const cors = require("cors");

const { userRouter } = require("./Routes/User.route");
const { connection } = require("./config/connection.db");
const { aboutRouter } = require("./Routes/about.route");
const { homeRouter } = require("./Routes/home.route");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("A Server for Brand Radiator");
});

app.use("/api", userRouter);
app.use("/api", aboutRouter);
app.use("/api", homeRouter);

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log("Server Connected to database");
  } catch (err) {
    console.log({ err: err });
  }
  console.log(`Server Running On Port ${process.env.PORT}`);
});

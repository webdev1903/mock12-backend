const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connect = require("./configs/db");

const userController = require("./controllers/user.controller");
const Calculator = require("./controllers/user.calculator");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/calculate", Calculator);
app.use("", userController);

app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log(`listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});

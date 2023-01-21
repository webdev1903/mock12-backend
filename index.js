const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  try {
    console.log(`listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});

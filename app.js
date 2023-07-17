const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const menuRouter = require("./routes/menu");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/menu-items", menuRouter);

// error handler
app.use(function (err, req, res, next) {
  if(error) {
    next(res.send("error"))
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require('./routes/index');
const menuRouter = require("./routes/menu");

const app = express();
const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use("/menu-items", menuRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(res.send("Nothing found"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const CubejsServerCore = require("@cubejs-backend/server-core");
const app = express();
const logger = require("morgan");
const createError = require("http-errors");
const cors = require("cors");
const helmet = require("helmet");
const users = require("./routes/users");
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000
});
const config = {
  security: true
};
const serverCore = CubejsServerCore.create(config);


app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(bodyParser.json({ limit: "50mb" }));
// Redirect to api limiter
app.use("/", apiLimiter);
app.use(logger("dev"));
app.set("view engine", "jade");
app.use(helmet({
  frameguard: {
  action: 'deny'
}}));
app.use("/", users);

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, PATCH, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, X-Requested-With, x-request-id");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});

serverCore.initApp(app);
app.disable("x-powered-by");



app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;

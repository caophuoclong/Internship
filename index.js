const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/database");
const session = require("express-session");
const api = require("./routes/api");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      //secure: true
    },
  })
);
app.get("/", (req, res) => {
  res.send("xin chao");
});

app.use("/api", api);

app.listen(5000);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hey, it's me Juned!");
});

module.exports = app;

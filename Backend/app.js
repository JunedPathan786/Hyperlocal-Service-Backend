const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/auth.routes");
const providerRoute = require("./routes/provider.routes");
const serviceRoute = require("./routes/service.routes");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/provider", providerRoute);
app.use("/api/v1/service", serviceRoute);

app.get("/", (req, res) => {
  res.send("Hey, it's me Juned!");
});

module.exports = app;

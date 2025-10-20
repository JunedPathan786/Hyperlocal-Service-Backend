const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:4000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const providerRoute = require("./routes/provider.routes");
const serviceRoute = require("./routes/service.routes");
const bookingRoute = require("./routes/booking.routes");
const paymentRoute = require("./routes/payment.routes");
const reviewRoute = require("./routes/review.routes");
const adminRoute = require("./routes/admin.routes");

app.use("/api/v1/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/v1/provider", providerRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Urban Company API — Developed by Juned Pathan");
});

module.exports = app;

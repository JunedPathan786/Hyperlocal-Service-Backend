const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error.middleware");
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const providerRoute = require("./routes/provider.routes");
const serviceRoute = require("./routes/service.routes");
const bookingRoute = require("./routes/booking.routes");
const paymentRoute = require("./routes/payment.routes");
const reviewRoute = require("./routes/review.routes");
const adminRoute = require("./routes/admin.routes");
const usersRoute = require("./routes/users.routes");

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/provider", providerRoute);
app.use("/api/service", serviceRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/review", reviewRoute);
app.use("/api/admin", adminRoute);
app.use("/api/users", usersRoute);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Urban Company API — Developed by Juned Pathan");
});

module.exports = app;
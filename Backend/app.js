const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/auth.routes");
const userRoute = require('./routes/user.routes');
const providerRoute = require("./routes/provider.routes");
const serviceRoute = require("./routes/service.routes");
const bookingRoute = require('./routes/booking.routes');
const paymentRoute = require('./routes/payment.routes');
const reviewRoute = require('./routes/review.routes');
const adminRoute = require('./routes/admin.routes');


app.use("/api/v1/auth", authRoute);
app.use('/api/users', userRoute);
app.use("/api/v1/provider", providerRoute);
app.use("/api/v1/service", serviceRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/admin', adminRoute);

app.get("/", (req, res) => {
  res.send("Hey, it's me Juned!");
});

module.exports = app;
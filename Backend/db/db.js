const mongoose = require('mongoose')  

function connedDB() {
  const dbURI = process.env.DB_CONNECT;

  mongoose
    .connect(dbURI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

module.exports = connedDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host} DB: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.error("MONGODB connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

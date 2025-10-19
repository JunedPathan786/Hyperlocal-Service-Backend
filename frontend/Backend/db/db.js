const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
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

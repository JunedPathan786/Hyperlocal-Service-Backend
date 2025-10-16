const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    // Use the `dbName` option so mongoose connects to the intended database
    // regardless of whether the URI already contains a database.
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

const dotenv = require('dotenv')
dotenv.config()
const app = require("./app");
const connectDB = require("./config/db");

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  });
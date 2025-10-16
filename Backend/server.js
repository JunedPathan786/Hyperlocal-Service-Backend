require("dotenv").config();
const app = require("./app");
const connectDB = require("./db/db");

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running at port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed!", error);
  });

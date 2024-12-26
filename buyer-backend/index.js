import express from "express";
import dbConnect from "./src/db/connect.js";
import { config as configDotenv } from "dotenv"; // Load dotenv
import router from "./src/routes/user.js"
// Configure dotenv
configDotenv();

const app = express();
app.use(express.json());
app.use('/user',router)
const port = process.env.PORT || 8989;

app.listen(port, () => {
  dbConnect();
  console.log(`Buyer service is running on port ${port}`);
});

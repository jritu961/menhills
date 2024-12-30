import express from "express";
import dbConnect from "./src/db/connect.js";
import { config as configDotenv } from "dotenv"; // Load dotenv
import router from "./src/routes/user.js"
import rootRouter from "./src/routes/cart.js"
import cors from "cors"
// Configure dotenv
configDotenv();

const app = express();
app.use(cors())
app.use(express.json());
app.use('/user',router)
app.use('/user',rootRouter)

const port = process.env.PORT || 8989;

app.listen(port, () => {
  dbConnect();
  console.log(`Buyer service is running on port ${port}`);
});

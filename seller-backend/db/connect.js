import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const url=process.env.DATABASE_URL
console.log("url>>>>>>>>>>",url)
const connectDb=async ()=>{
  await mongoose.connect(url)
  console.log("Database connected")
}

export default connectDb
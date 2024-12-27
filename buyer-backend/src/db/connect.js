import mongoose from "mongoose"



const dbConnect=async ()=>{
  await mongoose.connect(process.env.DATABASE_BUYER_URL)
  console.log("Database connected")
}

export default dbConnect
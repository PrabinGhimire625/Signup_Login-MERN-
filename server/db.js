import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// 1. Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL; // Local database
// const mongoURL = process.env.MONGODB_URL; // Online database URL

// 2. Set up MongoDB connection
mongoose.connect(mongoURL, {
  // useNewUrlParser and useUnifiedTopology are no longer needed
});

// 3. Get the default connection
const db = mongoose.connection;

// 4. Define event listeners
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

// Error event listener
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Disconnected event listener
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// 5. Export database connection
export default db;

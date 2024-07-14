import express from "express";
import dotenv from "dotenv";
import db from "./db.js"; // Ensure the file extension is correct
import cors from "cors";
import cookieParser from "cookie-parser"; //read and handle cookies in your server.  always import in server.js pages
dotenv.config();  //to access the .env file ko variables
const app = express();

app.use(cookieParser());
app.use(express.json()); // Parses incoming requests with JSON payloads

//CORS(Cross origin resource sharing)
app.use(cors({
  origin: ["http://localhost:5173"], //yo site bata ako data matra linxa
  credentials: true,   //allows cookies to be sent and received between the frontend and backend.
}));

import signupRoute from "./routes/userRoutes.js";
app.use("/auth", signupRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

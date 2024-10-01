import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import sendEmail from "../services/sendEmail.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
router.use(cookieParser());

// Register
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const payload={ username: user.username, role: user.role }
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token);   //store jwt in cookie

    res.status(200).json({ message: "Login successful", token, data: user.role });
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//verify user from token before profile pages
const verifyUser = (req, res, next) => {
  const token = req.cookies.token; //from the login res.cookie("token", token); 
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { // decoded object will contain the same data that was put into the payload when the token was created.
      if (err) {
        return res.status(403).json({ message: "Token is invalid" });
      }
      try {
        const user = await User.findOne({ username: decoded.username });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user = user;  //yo user tala profile ma req.user ma janxa
        next();
      } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  }
};

//profile route
router.get("/profile", verifyUser, (req, res) => {
  res.status(200).json({ message: "Success", data: {  id: req.user._id, username: req.user.username, email: req.user.email}
  });
});

// // Check if the user is logged in from the token inside cookie
router.get("/isLoggedIn", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is invalid" });
    }
    res.status(200).json({ message: "Logged in", user: decoded });
  });
});

// 
router.get("/logout", verifyUser, (req, res) => {
  console.log("Logout route hit");
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});


//get all signup user
router.get("/getAllUser", async(req,res)=>{
  try{
    const user=await User.find();
    res.status(200).json({message: "Successfully get all the user", data:user})
  }catch(err){
    res.status(500).json({error: "Internal server error"})
  }
})

//get the single user
router.get("/singleUser/:id",async(req, res)=>{
  try{
    const id=req.params.id
    const user=await User.findById(id)
    res.status(200).json({message:"Single user is successfully fetched",data:user})
  }catch(err){
    res.status(500).json({error:"Internal server error"})
  }
})


//update the user
router.patch("/edituser/:id",async(req, res)=>{
  try{
    const id=req.params.id
    const { username, email, password }=req.body
    const user=await User.findByIdAndUpdate(id,{ username, email, password })
    res.status(200).json({message:"User is successfully updated", data:user})

  }catch(err){
    res.status(500).json({error: "Internal server error"})
  }
})

//delete user
router.delete("/deleteUser/:id",async(req, res)=>{
  try{
    const id=req.params.id;
    const user=await User.findByIdAndDelete(id);
    res.status(200).json({message:"Successfully delete the user", data:user})
  }catch(err){
    res.status(500).json({error: "Internal server error"})
  }
})

// Forgot Password Route
router.post("/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Request Body:", req.body);

    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }

    // Check if the email is registered
    const userExist = await User.findOne({ email: email }); // Changed to findOne

    console.log("User Exist Check:", userExist); // Log to see the found user

    if (!userExist) { // Check if userExist is null or undefined
      return res.status(404).json({ message: "Email is not registered" });
    }

    // Generate and save OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    userExist.otp = otp; // Assuming you have a field `otp` in your user model
    await userExist.save();

    // Send OTP via email
    await sendEmail({
      email: email,
      subject: "Your OTP forgotPassword",
      message: `Your OTP is ${otp}. Do not share this with anyone.`,
    });

    res.status(200).json({ message: "OTP sent successfully", data: email });
  } catch (err) {
    console.error("Error in forgotPassword:", err); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
});


// Verify OTP Route
router.post("/verifyOtp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    

    if (!email || !otp) {
      return res.status(400).json({ message: "Please provide both email and OTP" });
    }

    // Check if the OTP is correct for the email
    const userExists = await User.find({ email: email }).select("+otp +isOtpVerified");

    if (userExists.length === 0) {
      return res.status(404).json({ message: "Email is not registered" });
    }

    if (userExists[0].otp !== parseInt(otp, 10)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Dispose of OTP after successful verification
    userExists[0].otp = undefined;
    userExists[0].isOtpVerified = true;
    await userExists[0].save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


//reset password
router.post("/resetPassword",async (req,res)=>{
  const {email,newPassword,confirmPassword} = req.body
  if(!email || !newPassword || !confirmPassword){
      return res.status(400).json({
          message : "Please provide email,newPassword,confirmPassword"
      })
  }
  if(newPassword !== confirmPassword){
      return res.status(400).json({
          message : "newPassword and confirmPassword doesn't match"
      })
  }

  const userExists = await User.find({email:email}).select("+isOtpVerified")
  if(userExists.length == 0){
      return res.status(404).json({
          message : "User email not registered"
      })
  }
  console.log(userExists)
  if(userExists[0].isOtpVerified != true){
      return res.status(403).json({
          message : "You cannot perform this action"
      })
  }

  userExists[0].password = bcrypt.hashSync(newPassword,10)
  userExists[0].isOtpVerified = false;
  await userExists[0].save()

  res.status(200).json({
      message : "Password changed successfully"
  })
}
)



export default router;

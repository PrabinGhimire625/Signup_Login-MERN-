import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
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
  const token = req.cookies.token;
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

// Logout
router.post("/logout", verifyUser, (req, res) => {
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

// Forgot Password
router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//updates user
// router.patch("/userUpdate/:id", async(req, res)=>{
//   const id=req.params.id
//   const {username, email, password}=req.body
//   await User.findByIdAndUpdate(id, {
//     username:username,
//     email:email,
//     password:password
//   })
//   res.status(200).json({message:"User update successfully"})
// })

export default router;

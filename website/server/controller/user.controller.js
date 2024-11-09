import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const userSignUp = async (req, res, next) => {
  const { name, email, password, age, gender, city } = req.body;

  //   Check if all the fields are present
  if (!name || !email || !password || !age || !gender || !city) {
    return createError(req, res, next, "Please provide all the details", 400);
  }

  // Check if the user already exists if the user exists, return an error Else, create a new user
  const user = await UserModel.findOne({ email: email });

  if (user) {
    return createError(req, res, next, "User already exists", 409);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = new UserModel({
    name,
    email,
    password: hashPassword,
    age,
    gender,
    city,
  });

  const savedUser = await newUser.save();

  // Create and assign a token
  const token = jwt.sign(
    {
      userId: savedUser.userId,
      gender: savedUser.gender,
      age: savedUser.age,
      city: savedUser.city,
    },
    process.env.TOKEN_SECRET,
    { algorithm: "HS256" }
  );

  res.cookie("auth-token", token, {
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: savedUser,
  });
};

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if all the fields are present
  if (!email || !password) {
    return createError(req, res, next, "Please provide all the details", 400);
  }

  // Check if the user exists
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return createError(req, res, next, "User doesn't exist", 404);
  }

  // Check if the password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return createError(req, res, next, "Invalid password", 400);
  }

  // Create and assign a token
  const token = jwt.sign(
    {
      userId: user.userId,
      gender: user.gender,
      age: user.age,
      city: user.city,
    },
    process.env.TOKEN_SECRET,
    { algorithm: "HS256" }
  );

  // Set token in cookie
  res.cookie("auth-token", token, {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: user,
  });
};

export const userLogout = async (req, res, next) => {
  res.cookie("auth-token", "", {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

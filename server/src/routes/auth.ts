import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

const { SECRET_KEY = "mysecretkey" } = process.env;

// Register a new user
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });
      if (user) {
        return res.status(403).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ username, password: hashedPassword });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.json({ token, name: newUser.username });
    } catch (error) {
      next(error);
    }
  }
);

// Login with an existing user
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.json({ token, name: user.username });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

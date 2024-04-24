import { Router } from "express";
import { signOutService } from "../services/signOutService.js";

const signOutRoute = Router();

signOutRoute.post("/", async (req, res) => {
  const { username } = req.body;
  const result = await signOutService.signOutUser(username);
  res.clearCookie("refreshToken");
  return res.status(201).json({ message: "You have successfully signed out" });
});

export default signOutRoute;

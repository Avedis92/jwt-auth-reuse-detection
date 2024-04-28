import { Router } from "express";
import { signOutService } from "../services/signOutService.js";
import { AppError } from "../shared/utils/error.js";

const signOutRoute = Router();

signOutRoute.post("/", async (req, res, next) => {
  const { username } = req.body;
  try {
    await signOutService.signOutUser(username);
    res.clearCookie("refreshToken");
    return res
      .status(201)
      .json({ message: "You have successfully signed out" });
  } catch (err) {
    const error = new AppError(400, "sign Out route main handler", err.message);
    next(error);
  }
});

export default signOutRoute;

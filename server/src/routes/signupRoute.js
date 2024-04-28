import { Router } from "express";
import { verifyUsernameExists } from "../middlewares/verifyUsernameExists.js";
import { signUpService } from "../services/signUpService.js";
import { AppError } from "../shared/utils/error.js";

const signUpRoute = Router();

signUpRoute.post("/", verifyUsernameExists, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    await signUpService.addUser(username, password);
    return res.status(201).json({ message: "You have successfully signed Up" });
  } catch (err) {
    const error = new AppError(400, "signUp route main handler", err.message);
    next(error);
  }
});

export default signUpRoute;

import { Router } from "express";
import bodyParser from "body-parser";
import { verifyUsernameExists } from "../middlewares/verifyUsernameExists.js";
import { signUpService } from "../services/signUpService.js";

const signUpRoute = Router();

signUpRoute.use(bodyParser.json());

signUpRoute.post("/", verifyUsernameExists, async (req, res) => {
  const { username, password } = req.body;
  const result = await signUpService.addUser(username, password);
  return res.status(201).json({ message: "You have successfully signed Up" });
});

export default signUpRoute;

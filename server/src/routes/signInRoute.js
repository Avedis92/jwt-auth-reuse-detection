import { Router } from "express";
import jwt from "jsonwebtoken";
import * as DotEnv from "dotenv";
import { authenticateUser } from "../middlewares/authUser.js";
import { signInService } from "../services/signInService.js";

const signInRoute = Router();
DotEnv.config();

signInRoute.post("/", authenticateUser, async (req, res) => {
  const { username } = req.body;
  // here user has been authenticated
  // we should now create an access token and a refresh token and send them to the client.
  const accessToken = jwt.sign(
    { data: username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { data: username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "20m" }
  );
  /*
  1- Add refresh token to auth user and switch user's isLoggedOut to false.
  2- Add the refresh token inside the response cookie.
  3- Send the access token as a json to the client.
   */
  await signInService.loginUser(username, refreshToken);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 20 * 60 * 1000,
  });
  res
    .status(201)
    .json({ message: "You have successfully logged in", accessToken });
});

export default signInRoute;

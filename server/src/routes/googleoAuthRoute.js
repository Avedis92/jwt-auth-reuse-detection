import { Router } from "express";
import jwt from "jsonwebtoken";
import * as DotEnv from "dotenv";
import { getGoogleOAuthTokens } from "../middlewares/getGoogleOAuthTokens.js";
import { signNewAccessToken, signNewRefreshToken } from "../shared/helpers.js";
import { userService } from "../services/userService.js";
import { signInService } from "../services/signInService.js";

const googleOAuthRoute = Router();
DotEnv.config();

googleOAuthRoute.get("/", getGoogleOAuthTokens, async (req, res, next) => {
  const { name } = req.user;
  // this approach with finding user by username is temporary until we switch
  // to using email instead of username
  const foundUser = await userService.getUserByUsername(name);
  // if no user is found, then it is a new user
  // so we need to add this user to table and create a refresh and access token
  // because he was already authenticated with the google or other authorization server
  const accessToken = signNewAccessToken(name);
  const refreshToken = signNewRefreshToken(name);
  if (!foundUser) {
    await signInService.loginOAuthUser(name, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
    });
    res.status(201).json({ accessToken });
  } else {
    await signInService.loginUser(name, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
    });
    res.status(201).json({ accessToken });
  }
});

export default googleOAuthRoute;

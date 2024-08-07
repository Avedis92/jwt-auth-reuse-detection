import { Router } from "express";
import jwt from "jsonwebtoken";
import * as DotEnv from "dotenv";
import { userService } from "../services/userService.js";
import { signOutService } from "../services/signOutService.js";
import { AppError } from "../shared/utils/error.js";
import { signNewAccessToken, signNewRefreshToken } from "../shared/helpers.js";

const refreshTokenRoute = Router();
DotEnv.config();

refreshTokenRoute.get("/", async (req, res, next) => {
  /*
    1- get the refresh token
    2- check if the refresh token is expired then user must sign in again
    3- if refresh token exists then check if a user is found for that token
    4- If no user is found then it is a reuse detection
    5- if user is found then proceed with creating a new access and refresh token, 
    invalidate previous token and send the new tokens to the browser
     */
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) res.status(401).json({ error: "You need to sign in" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    maxAge: 20 * 60 * 1000,
  });
  const foundUser = await userService.getUserByRefreshToken(refreshToken);
  // if user is found then continue to recreate new access and refresh token
  // if user was not found, then a reuse detection is triggered
  // we should retrieve user info from refresh token
  // if reused refresh token is expired then no need to panic
  // else remove  all cookies and invalidate non malicious user refresh token and make him log out

  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
        if (err) {
          return res.sendStatus(403);
        }
        const { data: username } = decode;
        try {
          const hackedUser = await userService.getUserByUsername(username);
          // if the hacked user is found then invalidate the user's refresh token
          if (hackedUser) {
            await signOutService.signOutUser(username);
          }
          return res.sendStatus(403);
        } catch (err) {
          const error = new AppError(
            400,
            "refresh token verify jwt for unknown user",
            err.message
          );
          next(error);
        }
      }
    );
  } else {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
        if (err) {
          return res.status(403).json({ error: "Invalid token" });
        }
        const { data } = decode;
        const accessToken = signNewAccessToken(data);
        const newRefreshToken = signNewRefreshToken(data);

        try {
          await userService.addRefreshToken(data, newRefreshToken);
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            maxAge: 20 * 60 * 1000,
          });
          return res.status(201).json({ accessToken });
        } catch (err) {
          const error = new AppError(
            400,
            "refresh token creating new refresh token",
            err.message
          );
          next(error);
        }
      }
    );
  }
});

export default refreshTokenRoute;

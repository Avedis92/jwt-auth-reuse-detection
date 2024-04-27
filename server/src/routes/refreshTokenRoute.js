import { Router } from "express";
import jwt from "jsonwebtoken";
import * as DotEnv from "dotenv";
import { userService } from "../services/userService.js";

const refreshTokenRoute = Router();
DotEnv.config();

refreshTokenRoute.get("/", async (req, res) => {
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
  const foundUser = await userService.getUserByRefreshToken(refreshToken);
  // we need to update the content for reuse detection
  if (foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
        if (err) {
          return res.status(403).json({ error: "Invalid token" });
        }
        const { data } = decode;
        const accessToken = jwt.sign(
          { data },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );

        const newRefreshToken = jwt.sign(
          { data },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "20m" }
        );

        await userService.addRefreshToken(data, newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          maxAge: 20 * 60 * 1000,
        });
        return res.status(201).json({ accessToken });
      }
    );
  }
});

export default refreshTokenRoute;

import jwt from "jsonwebtoken";
import * as DotEnv from "dotenv";
import { userService } from "../services/userService.js";

DotEnv.config();

export const verifyIfUserAuthorized = async (req, res, next) => {
  // first check if client has an access token
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken)
    return res.status(401).json({ error: "You do not have authorization." });

  // verify if the token is still valid or expired
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    // we have an access token
    // now verify if it is expired or the token is invalid
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res
          .status(403)
          .json({ error: "Invalid json access token", type: "invalid" });
      }
      if (err.name === "TokenExpiredError") {
        // token expired, we need to see if the user has a refresh token
        // it the refresh token is valid then use it to create a new access token
        // invalidate the refresh token and recreate a new one and send it back
        return res.status(403).json({
          error: "Token expired",
          type: "expired",
        });
      }
    }
    // if the access token is not expired
    req.user = decode;
    next();
  });
};

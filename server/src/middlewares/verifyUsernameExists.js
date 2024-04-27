import { userService } from "../services/userService.js";

export const verifyUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  const existentUser = await userService.getUserByUsername(username);
  if (existentUser) {
    // code 409 is for duplicate record
    return res.status(409).json({ error: "User already exists" });
  }
  return next();
};

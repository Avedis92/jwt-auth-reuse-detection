import { userService } from "../services/userService.js";

export const verifyUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  const existentUser = await userService.getUser(username);
  if (existentUser.length) {
    return res.status(409).json({ error: "User already exists" });
  }
  return next();
};

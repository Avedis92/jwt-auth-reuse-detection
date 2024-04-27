import { userService } from "../services/userService.js";

export const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;
  const foundUser = await userService.getUserByUsernameAndPassword(
    username,
    password
  );
  if (!foundUser) {
    return res.status(404).json({ error: "User not found" });
  }
  return next();
};

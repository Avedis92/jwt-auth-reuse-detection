import { userService } from "../services/userService.js";
import { AppError } from "../shared/utils/error.js";

export const verifyUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  try {
    const existentUser = await userService.getUserByUsername(username);
    if (existentUser) {
      // code 409 is for duplicate record
      return res.status(409).json({ error: "User already exists" });
    }
    return next();
  } catch (err) {
    const error = new AppError(400, "verifyIfUsernameExists", err.message);
    next(error);
  }
};

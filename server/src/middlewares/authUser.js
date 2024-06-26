import { userService } from "../services/userService.js";
import { AppError } from "../shared/utils/error.js";

export const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const foundUser = await userService.getUserByUsernameAndPassword(
      username,
      password
    );
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return next();
  } catch (err) {
    const error = new AppError(400, "authenticateUser", err.message);
    next(error);
  }
};

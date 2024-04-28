import { Router } from "express";
import { postService } from "../services/postService.js";
import { verifyIfUserAuthorized } from "../middlewares/verifyIfUserAuthorized.js";
import { AppError } from "../shared/utils/error.js";

const authorizedRoute = Router();

authorizedRoute.post("/", verifyIfUserAuthorized, async (req, res, next) => {
  // if we have a valid access token then proceed of sending the authorized users
  try {
    const username = req.user.data;
    const { post } = req.body;
    await postService.addPost(username, post);
    const results = await postService.getUsersPosts(username);
    res.status(201).json({ posts: results });
  } catch (err) {
    const error = new AppError(400, "auth route main handler", err.message);
    next(error);
  }
});

export default authorizedRoute;

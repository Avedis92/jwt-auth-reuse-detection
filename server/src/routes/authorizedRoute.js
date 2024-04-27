import { Router } from "express";
import { postService } from "../services/postService.js";
import { verifyIfUserAuthorized } from "../middlewares/verifyIfUserAuthorized.js";

const authorizedRoute = Router();

authorizedRoute.post("/", verifyIfUserAuthorized, async (req, res) => {
  // if we have a valid access token then proceed of sending the authorized users
  const username = req.user.data;
  const { post } = req.body;
  await postService.addPost(username, post);
  const results = await postService.getUsersPosts(username);
  res.status(201).json({ posts: results });
});

export default authorizedRoute;

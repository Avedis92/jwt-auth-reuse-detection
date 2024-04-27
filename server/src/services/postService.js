import { query } from "../db/index.js";

class PostService {
  async getUsersPosts(username) {
    const { rows } = await query(
      'SELECT username, post FROM "posts" WHERE username=$1',
      [username]
    );
    return rows;
  }
}

export const postService = new PostService();

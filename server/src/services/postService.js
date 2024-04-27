import { query } from "../db/index.js";

class PostService {
  async getUsersPosts(username) {
    const { rows } = await query(
      'SELECT username, post FROM "posts" WHERE username=$1',
      [username]
    );
    return rows;
  }
  async addPost(username, postText) {
    const { rows } = await query(
      'INSERT INTO "posts"(username,post) VALUES($1,$2)',
      [username, postText]
    );
    return rows[0];
  }
}

export const postService = new PostService();

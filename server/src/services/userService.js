import { query } from "../db/index.js";

class UserService {
  async getUser(username) {
    const { rows } = await query('SELECT * FROM "user" WHERE username=$1', [
      username,
    ]);
    return rows;
  }
}

export const userService = new UserService();

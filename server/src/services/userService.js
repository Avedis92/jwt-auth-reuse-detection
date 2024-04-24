import { query } from "../db/index.js";

class UserService {
  async getUserByUsername(username) {
    const { rows } = await query('SELECT * FROM "user" WHERE username=$1', [
      username,
    ]);
    return rows;
  }
  async getUserByUsernameAndPassword(username, password) {
    const { rows } = await query(
      'SELECT * FROM "user" WHERE username=$1 AND password=$2',
      [username, password]
    );
    return rows[0];
  }
}

export const userService = new UserService();

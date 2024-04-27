import { query } from "../db/index.js";

class UserService {
  async getUserByUsername(username) {
    const { rows } = await query('SELECT * FROM "user" WHERE username=$1', [
      username,
    ]);
    return rows[0];
  }
  async getUserByUsernameAndPassword(username, password) {
    const { rows } = await query(
      'SELECT * FROM "user" WHERE username=$1 AND password=$2',
      [username, password]
    );
    return rows[0];
  }
  async getUserByRefreshToken(refreshToken) {
    const { rows } = await query(
      'SELECT * FROM "user" WHERE refresh_token=$1',
      [refreshToken]
    );
    return rows[0];
  }
  async addRefreshToken(username, refreshToken) {
    const { rows } = await query(
      'Update "user" SET refresh_token=$1 WHERE username=$2',
      [refreshToken, username]
    );
    return rows[0];
  }
}

export const userService = new UserService();

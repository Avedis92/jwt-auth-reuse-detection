import { query } from "../db/index.js";

class SignInService {
  async loginUser(username, refreshToken) {
    const { rows } = await query(
      'UPDATE "user" SET refresh_token = $1, is_loggedout= $2 WHERE username=$3 RETURNING *',
      [refreshToken, false, username]
    );
    return rows[0];
  }
}

export const signInService = new SignInService();

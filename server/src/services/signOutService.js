import { query } from "../db/index.js";

class SignOutService {
  async signOutUser(username) {
    const { rows } = await query(
      'UPDATE "user" SET refresh_token=$1, is_loggedout=$2 WHERE username=$3',
      [null, true, username]
    );
    return rows[0];
  }
}

export const signOutService = new SignOutService();

import { query } from "../db/index.js";

class SignUpService {
  async addUser(username, password) {
    const { rows } = await query(
      'INSERT INTO "user"(username, password) VALUES($1,$2) RETURNING *',
      [username, password]
    );
    return rows;
  }
}

export const signUpService = new SignUpService();

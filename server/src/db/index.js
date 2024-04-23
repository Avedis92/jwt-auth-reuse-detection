import pg from "pg";
import * as DotEnv from "dotenv";

DotEnv.config();

const { Pool } = pg;

// create a pool of connections
const pool = new Pool({
  host: "localhost",
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: +process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

export const query = (text, value) => pool.query(text, value);

import express from "express";
import * as DotEnv from "dotenv";
import { query } from "./db/index.js";

DotEnv.config();
const port = +process.env.SERVER_PORT;

const app = express();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

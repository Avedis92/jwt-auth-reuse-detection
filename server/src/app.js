import express from "express";
import * as DotEnv from "dotenv";
import signUpRoute from "./routes/signupRoute.js";

DotEnv.config();
const port = +process.env.SERVER_PORT;

const app = express();
app.use("/api/v1/signUp", signUpRoute);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

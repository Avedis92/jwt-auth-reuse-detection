import express from "express";
import * as DotEnv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import signUpRoute from "./routes/signupRoute.js";
import signInRoute from "./routes/signInRoute.js";

DotEnv.config();
const port = +process.env.SERVER_PORT;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1/signup", signUpRoute);
app.use("/api/v1/signIn", signInRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

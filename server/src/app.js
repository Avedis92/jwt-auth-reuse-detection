import express from "express";
import * as DotEnv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import signUpRoute from "./routes/signupRoute.js";
import signInRoute from "./routes/signInRoute.js";
import signOutRoute from "./routes/signOutRoute.js";
import authorizedRoute from "./routes/authorizedRoute.js";
import refreshTokenRoute from "./routes/refreshTokenRoute.js";

DotEnv.config();
const port = +process.env.SERVER_PORT;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1/signup", signUpRoute);
app.use("/api/v1/signIn", signInRoute);
app.use("/api/v1/signOut", signOutRoute);
app.use("/api/v1/posts", authorizedRoute);
app.use("/api/v1/refreshToken", refreshTokenRoute);

app.use((error, req, res, next) => {
  console.log(`${error.statusCode}: ${error.message}`);
  return res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

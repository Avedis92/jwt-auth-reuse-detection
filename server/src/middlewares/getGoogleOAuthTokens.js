import { googleAuthServerTokenRootUrl } from "../shared/constant.js";
import fetch from "node-fetch";

const retrieveGoogleOAuthTokens = async (authorizationCode) => {
  const code = authorizationCode;
  const options = {
    code,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    client_id: process.env.GOOGLE_OAUTH_CLIENTiD,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    grant_type: "authorization_code",
  };
  const qs = new URLSearchParams(options);
  const requestUrl = `${googleAuthServerTokenRootUrl}?${qs.toString()}`;
  const res = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const json = await res.json();
  return json;
};

const retrieveGoogleUserInfo = async (id_token, access_token) => {
  const googleUserInfoRootUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
  const options = {
    alt: "json",
    access_token,
  };
  const qs = new URLSearchParams(options);
  const googleUserInfoUrl = `${googleUserInfoRootUrl}?${qs.toString()}`;
  const res = await fetch(googleUserInfoUrl, {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });
  const json = await res.json();
  return json;
};

export const getGoogleOAuthTokens = async (req, res, next) => {
  const code = req.query.code;
  const { id_token, access_token } = await retrieveGoogleOAuthTokens(code);
  const googleUser = await retrieveGoogleUserInfo(id_token, access_token);
  req.user = googleUser;
  next();
};

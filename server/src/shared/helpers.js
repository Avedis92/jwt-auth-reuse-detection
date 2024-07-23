import jwt from "jsonwebtoken";

export const signNewAccessToken = (data) => {
  const accessToken = jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
  return accessToken;
};

export const signNewRefreshToken = (data) => {
  const refreshToken = jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  return refreshToken;
};

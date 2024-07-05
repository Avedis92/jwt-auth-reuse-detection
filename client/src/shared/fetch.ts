import { endpoints } from "./endpoints";
import { IInput, ISignUp, IRequestData, ISignIn, IPosts } from "./types";
import { processOptions, processUrl } from "./config";

export const signUpUser = (userInfo: IInput): Promise<ISignUp> => {
  const requestData: IRequestData = {
    endpoints: endpoints.signup,
    method: "POST",
    body: JSON.stringify(userInfo),
  };
  return fetch(processUrl(requestData), processOptions(requestData)).then(
    (res) => res.json()
  );
};

export const signInUser = (userInfo: IInput): Promise<ISignIn> => {
  const requestData: IRequestData = {
    endpoints: endpoints.signIn,
    method: "POST",
    body: JSON.stringify(userInfo),
  };
  return fetch(processUrl(requestData), processOptions(requestData)).then(
    (res) => res.json()
  );
};

export const signOutUser = (
  userInfo: Record<string, string>
): Promise<ISignUp> => {
  const requestData: IRequestData = {
    endpoints: endpoints.signOut,
    method: "POST",
    body: JSON.stringify(userInfo),
  };
  return fetch(processUrl(requestData), processOptions(requestData)).then(
    (res) => res.json()
  );
};

export const postPosts = (
  accessToken: string,
  post: string
): Promise<IPosts> => {
  const requestData: IRequestData = {
    endpoints: endpoints.posts,
    method: "POST",
    body: JSON.stringify({ post }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetch(processUrl(requestData), processOptions(requestData)).then(
    (res) => res.json()
  );
};

export const getNewTokens = (): Promise<{ accessToken: string }> => {
  const requestData: IRequestData = {
    endpoints: endpoints.refreshToken,
  };
  return fetch(processUrl(requestData), processOptions(requestData)).then(
    (res) => res.json()
  );
};

export const getGoogleOAuthTokens = (
  authCode: string
): Promise<{ accessToken: string }> => {
  const requestData: IRequestData = {
    endpoints: endpoints.googleOauthTokens,
    params: {
      code: authCode,
    },
  };
  return fetch(processUrl(requestData), processOptions(requestData)).then(
    (res) => res.json()
  );
};

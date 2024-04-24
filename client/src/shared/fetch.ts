import { endpoints } from "./endpoints";
import { IInput, ISignUp, IRequestData, ISignIn } from "./types";
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

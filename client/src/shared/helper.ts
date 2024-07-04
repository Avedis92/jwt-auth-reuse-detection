import { IInput, IInputError } from "./types";

export const allFieldsAreEmpty = (
  inputFields: IInput | IInputError
): boolean => {
  return Object.values(inputFields).every((i) => !i);
};

export const validateForm = (
  inputForm: IInput,
  initialInputErrors: IInputError,
  isSignUpForm: boolean
): IInputError => {
  const errorInputFields = { ...initialInputErrors };
  if (!inputForm.username) {
    errorInputFields.usernameError = "Username is required";
  }
  if (!inputForm.password) {
    errorInputFields.passwordError = "Password is required";
  }
  if (
    isSignUpForm &&
    (inputForm.password !== inputForm.confirmPassword ||
      !inputForm.confirmPassword)
  ) {
    errorInputFields.confirmPasswordError =
      "The content does not match the password";
  }
  return errorInputFields;
};

export const createGoogleOAuthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const profileScope = "https://www.googleapis.com/auth/userinfo.profile";
  const emailScope = "https://www.googleapis.com/auth/userinfo.email";
  const options = {
    redirect_uri: import.meta.env["VITE_GOOGLE_OAUTH_REDIRECT_URI"],
    response_type: "code",
    prompt: "consent",
    client_id: import.meta.env["VITE_GOOGLE_OAUTH_CLIENT_ID"],
    access_type: "offline",
    scope: [profileScope, emailScope].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

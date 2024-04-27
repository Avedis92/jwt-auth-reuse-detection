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

export interface IInput {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface IInputError {
  usernameError: string;
  passwordError: string;
  confirmPasswordError?: string;
}

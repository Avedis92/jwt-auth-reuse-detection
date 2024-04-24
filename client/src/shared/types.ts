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

export interface IHeaderOptions {
  [index: string]: string | undefined;
  Authorization?: string;
}

export interface IRequestData {
  baseUrl?: string;
  endpoints: string;
  path?: string;
  params?: Record<string, string>;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  headers?: IHeaderOptions;
  body?: string;
}

export interface ISignUp {
  error?: string;
  message?: string;
}

export interface ISignIn extends ISignUp {
  accessToken?: string;
}

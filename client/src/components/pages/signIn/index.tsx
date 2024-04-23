import { useState } from "react";
import Field from "../../organisms/field";
import { initialError, initialForm } from "./constants";
import { allFieldsAreEmpty, validateForm } from "../../../shared/helper";

const SignIn = () => {
  const [signUpForm, setSignUpForm] = useState(initialForm);
  const [errorForm, setErrorForm] = useState(initialError);

  const handleUsernameChange = (username: string) => {
    setSignUpForm({
      ...signUpForm,
      username,
    });
  };
  const handlePasswordChange = (password: string) => {
    setSignUpForm({
      ...signUpForm,
      password,
    });
  };
  //@ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorFields = validateForm(signUpForm, initialError);
    if (!allFieldsAreEmpty(errorFields)) {
      // @ts-ignore
      setErrorForm(errorFields);
    } else {
      setErrorForm(initialError);
      // start authentication. If user doesn't exist then return error message
      // telling user do not exist
      // else send success message telling user successfully authenticated,
      // plus send access token and refresh token.
    }
  };

  return (
    <form>
      <Field
        labelName="username"
        type="text"
        placeholder="Enter username"
        onChange={handleUsernameChange}
        value={signUpForm.username}
        error={errorForm.usernameError}
      />
      <Field
        labelName="password"
        type="password"
        placeholder="Enter password"
        onChange={handlePasswordChange}
        value={signUpForm.password}
        error={errorForm.passwordError}
      />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};
export default SignIn;

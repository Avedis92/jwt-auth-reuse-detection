import { useState } from "react";
import { initialForm, initialError } from "./constant";
import { allFieldsAreEmpty, validateForm } from "./helper";
import Field from "../../organisms/field";

const SignUp = () => {
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
  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setSignUpForm({
      ...signUpForm,
      confirmPassword,
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
      // send a post request to server and validate if the username already exists
      // if it exists return an error and display error
      //else display a message saying user successfully registered
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
      <Field
        labelName="Confirm password"
        type="password"
        placeholder="Confirm password"
        onChange={handleConfirmPasswordChange}
        value={signUpForm.confirmPassword}
        error={errorForm.confirmPasswordError}
      />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default SignUp;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialForm, initialError } from "./constant";
import { allFieldsAreEmpty, validateForm } from "../../../shared/helper";
import Field from "../../organisms/field";
import { signUpUser } from "../../../shared/fetch";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState(initialForm);
  const [errorForm, setErrorForm] = useState(initialError);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorFields = validateForm(signUpForm, initialError);
    if (!allFieldsAreEmpty(errorFields)) {
      // @ts-ignore
      setErrorForm(errorFields);
    } else {
      const res = await signUpUser({
        username: signUpForm.username,
        password: signUpForm.password,
      });
      if (res.error) {
        setErrorForm({
          ...initialError,
          usernameError: res.error,
        });
      }
      if (res.message) {
        setMessage(res.message);
        setErrorForm(initialError);
      }
      // send a post request to server and validate if the username already exists
      // if it exists return an error and display error
      //else display a message saying user successfully registered
    }
  };

  const navigateToSignIn = () => {
    navigate("signIn");
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
      {message && (
        <div>
          <p>{message}</p>
          <button onClick={navigateToSignIn}>Go to signIn</button>
        </div>
      )}
    </form>
  );
};

export default SignUp;

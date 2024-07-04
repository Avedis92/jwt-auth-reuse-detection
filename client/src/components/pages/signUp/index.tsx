import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialForm, initialError } from "./constant";
import { allFieldsAreEmpty, validateForm } from "../../../shared/helper";
import Field from "../../organisms/field";
import { signUpUser } from "../../../shared/fetch";
import styles from "./style.module.css";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState(initialForm);
  const [errorForm, setErrorForm] = useState(initialError);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { container, submitButton, messageContainer } = styles;

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
    const errorFields = validateForm(signUpForm, initialError, true);
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
    navigate("/signIn");
  };

  return (
    <div className={container}>
      <form>
        <Field
          labelName="Username"
          type="text"
          placeholder="Enter username"
          onChange={handleUsernameChange}
          value={signUpForm.username}
          error={errorForm.usernameError}
        />
        <Field
          labelName="Password"
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
        <button className={submitButton} onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className={messageContainer}>
        <p>Got account?Sign in</p>
        <button onClick={navigateToSignIn}>Go to signIn</button>
      </div>
    </div>
  );
};

export default SignUp;

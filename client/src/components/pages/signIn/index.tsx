import { useState } from "react";
import Field from "../../organisms/field";
import { initialError, initialForm } from "./constants";
import { allFieldsAreEmpty, validateForm } from "../../../shared/helper";
import { signInUser } from "../../../shared/fetch";

const SignIn = () => {
  const [signInForm, setSignInForm] = useState(initialForm);
  const [errorForm, setErrorForm] = useState(initialError);
  const [message, setMessage] = useState("");

  const handleUsernameChange = (username: string) => {
    setSignInForm({
      ...signInForm,
      username,
    });
  };
  const handlePasswordChange = (password: string) => {
    setSignInForm({
      ...signInForm,
      password,
    });
  };
  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorFields = validateForm(signInForm, initialError);
    console.log(errorFields);
    console.log(allFieldsAreEmpty(errorFields));
    if (!allFieldsAreEmpty(errorFields)) {
      // @ts-ignore
      setErrorForm(errorFields);
      return;
    } else {
      // start authentication. If user doesn't exist then return error message
      // telling user do not exist
      // else send success message telling user successfully authenticated,
      // plus send access token and refresh token.
      try {
        const result = await signInUser(signInForm);
        if (result.error) {
          setMessage(result.error);
        }
        if (result.message) {
          setMessage(result.message);
          localStorage.setItem("accessToken", result.accessToken!);
        }
      } finally {
        setErrorForm(initialError);
      }
    }
  };

  return (
    <div>
      <form>
        <Field
          labelName="username"
          type="text"
          placeholder="Enter username"
          onChange={handleUsernameChange}
          value={signInForm.username}
          error={errorForm.usernameError}
        />
        <Field
          labelName="password"
          type="password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
          value={signInForm.password}
          error={errorForm.passwordError}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};
export default SignIn;

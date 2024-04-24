import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../../organisms/field";
import { initialError, initialForm } from "./constants";
import { allFieldsAreEmpty, validateForm } from "../../../shared/helper";
import { signInUser } from "../../../shared/fetch";

const SignIn = () => {
  const [signInForm, setSignInForm] = useState(initialForm);
  const [errorForm, setErrorForm] = useState(initialError);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
          // this is just to use username instead of using state management
          localStorage.setItem("username", signInForm.username);
        }
      } finally {
        setErrorForm(initialError);
      }
    }
  };

  const handleSignOut = () => {
    navigate("/signOut");
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
      {message && (
        <div>
          <h2>{message}</h2>
          <button>Go to auhorized content</button>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
};
export default SignIn;

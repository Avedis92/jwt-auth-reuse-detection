import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../../shared/fetch";
import styles from "./style.module.css";

const SignOut = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Wait until you sign out...");
  const [showButton, setShowButton] = useState(false);
  const { container } = styles;

  const handleBackToSignIn = () => {
    navigate("/signIn");
  };

  useEffect(() => {
    setTimeout(async () => {
      const result = await signOutUser({
        username: localStorage.getItem("username")!,
      });
      if (result.message) {
        setMessage(result.message);
        setShowButton(true);
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");
      }
    }, 5000);
  }, []);

  return (
    <div className={container}>
      <p>{message}</p>
      {showButton && (
        <button onClick={handleBackToSignIn}>Go back to sign in page</button>
      )}
    </div>
  );
};
export default SignOut;

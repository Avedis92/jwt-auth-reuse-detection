import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../../shared/fetch";

const SignOut = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Wait until you sign out...");

  const handlebackToSignIn = () => {
    navigate("/signIn");
  };

  useEffect(() => {
    setTimeout(async () => {
      const result = await signOutUser({
        username: localStorage.getItem("username")!,
      });
      if (result.message) {
        setMessage(result.message);
        localStorage.removeItem("username");
        localStorage.removeItem("accessToken");
      }
    }, 5000);
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handlebackToSignIn}>Go back to sign in page</button>
    </div>
  );
};
export default SignOut;

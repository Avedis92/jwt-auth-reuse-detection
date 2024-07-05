import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getGoogleOAuthTokens } from "../../../shared/fetch";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getTokens = async () => {
      try {
        const authCode = searchParams.get("code") as string;
        const result = await getGoogleOAuthTokens(authCode);
        localStorage.setItem("accessToken", result.accessToken);
        navigate("/posts");
      } catch (e) {
        console.log("an error occurred");
      }
    };
    getTokens();
  }, []);
  return <h1>Success</h1>;
};
export default AuthSuccess;

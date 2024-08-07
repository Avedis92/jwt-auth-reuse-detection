import { Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/signUp";
import SignIn from "./components/pages/signIn";
import SignOut from "./components/pages/signOut";
import Posts from "./components/pages/posts";
import AuthSuccess from "./components/pages/oauth";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signOut" element={<SignOut />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/oauth/success" element={<AuthSuccess />} />
    </Routes>
  );
}

export default App;

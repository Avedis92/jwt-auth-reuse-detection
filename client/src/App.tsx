import { Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/signUp";
import SignIn from "./components/pages/signIn";
import SignOut from "./components/pages/signOut";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signOut" element={<SignOut />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/signUp";
import SignIn from "./components/pages/signIn";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import SignUp from "./components/pages/signUp";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="" element={<SignUp />} />
    </Routes>
  );
}

export default App;

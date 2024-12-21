import logo from "./logo.svg";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Setting from "./components/Setting";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="forgot_password" element={<ForgotPassword />}>
            <Route path="verify_email" element={<VerifyEmail />} />
            <Route path="reset_password" element={<ResetPassword />} />
          </Route>
          <Route path="success" element={<SuccessPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

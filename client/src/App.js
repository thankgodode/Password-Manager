import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axios from "axios";

import MyContext from "./contexts/MyContext";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Setting from "./components/Setting";
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
              <Route
                path="signup"
                element={
                  <Signup/>
                }
              >
                <Route path="verify" element={<VerifyEmail />} />
                <Route path="success" element={<SuccessPage />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Route>
            {/* <Route path="forgot_password" element={<ForgotPassword />}>
            <Route path="reset_password" element={<ResetPassword />} />
          </Route> */}
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes, HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";
import FeaturesProvider from "./contexts/FeaturesProvider";


import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Setting from "./components/Setting";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <HashRouter>
      <div className="App">
        {/* <Preloader/> */}
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
            <Route path="login" element={
              // <FeaturesProvider>
                <Login />
              //  </FeaturesProvider>
            } />
            </Route>
          <Route path="forgot_password"
            element={
              <FeaturesProvider>
                <ForgotPassword />
              </FeaturesProvider>
            } />
          <Route path="dashboard" element={
                <Dashboard />
          }/>
        </Routes>
        </div>
    </HashRouter>
  );
}

export default App;

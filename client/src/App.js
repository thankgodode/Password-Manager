import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";
import FeaturesProvider from "./contexts/FeaturesProvider";


import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

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
            />
            <Route 
              path="login" 
              element={
                <Login />
              }
            />
          </Route>
          <Route path="forgot_password"
            element={
              <FeaturesProvider>
                <ForgotPassword />
              </FeaturesProvider>
            } />
          <Route path="dashboard"
            element={
              <Dashboard />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

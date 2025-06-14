import logo from "./logo.svg";
import "./App.css";

import {createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";
import FeaturesProvider from "./contexts/FeaturesProvider";


import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

const router = createHashRouter([
  {
    path: "/",
    Component: Register,
    children: [
      {
        path: "signup",
        Component: Signup
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "forgot-password",
        element:<FeaturesProvider><ForgotPassword/></FeaturesProvider> 
      }
    ]
  },
  {
    path: "/dashboard",
    Component: Dashboard
  },

])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
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

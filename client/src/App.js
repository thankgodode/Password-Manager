import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
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
  );
}

export default App;

/*global chrome*/

import logo from "../img/icon_48.png";
import Login from "./Login";
import Signup from "./Signup";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Router } from "react-router-dom";
import { useState, useEffect } from "react";
import FeaturesProvider from "../contexts/FeaturesProvider";
import ViewPasswordProvider from "../contexts/ViewPasswordContext";
import API from "../utils/api";

function Register() {
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    console.log("Checking extension")
    if (typeof chrome !== undefined && chrome.tabs) {
      chrome.storage.local.get("token", async (result) => {
        try {
          if (result.token) {
            console.log("Logged in!")
            const auth = await API.get("/dashboard")
            navigate("/dashboard")
          }
        } catch (error) {
          return          
        }
      })
    }
  },[])
  
  const hideLayoutRoute = [
    "/login",
    "/signup",
    "/forgot-password"
  ];
  const shoudHideLayout = hideLayoutRoute.includes(location.pathname);

  const handleSignup = () => {
    if (typeof chrome !== undefined && chrome.tabs) {
      chrome.tabs.create({ url: "http://localhost:3000/#/signup" })
      window.close()
    }
  }

  const handleLogin = () => {
    if (typeof chrome !== undefined && chrome.tabs) {
      chrome.tabs.create({ url: "http://localhost:3000/#/login" })
      window.close()
    }
  }

  return (
    <>
      <FeaturesProvider>
          {!shoudHideLayout && (
            <>
              <div className="blue"></div>
              <div className="white"></div>
              <div class="wrap">
                <content>
                  <div className="img">
                    <img src={logo} />
                  </div>
                  <Link to="signup">
                  <button className="btn signup" onClick={handleSignup}>Signup</button>
                  </Link>
                  <Link to="login">
                    <button className="btn login" onClick={handleLogin}>Login</button>
                  </Link>
                </content>
              </div>
            </>
        )}
      <ViewPasswordProvider>
        <Outlet />
      </ViewPasswordProvider>
    </FeaturesProvider>
    </>
  );
}

export default Register;

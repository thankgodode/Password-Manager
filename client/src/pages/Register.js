/*global chrome*/

import logo from "../img/icon_48.png";
import Login from "./Login";
import Signup from "./Signup";

import { Link, Outlet, useLocation,useNavigate } from "react-router-dom";
import { Router } from "react-router-dom";
import { useState,useEffect } from "react";
import FeaturesProvider from "../contexts/FeaturesProvider";
import ViewPasswordProvider from "../contexts/ViewPasswordContext";

function Register() {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Checking extension")
    if (typeof chrome !== undefined && chrome.tabs) {
      chrome.storage.local.get(["token"], (result) => {
        console.log("Auth extension")
        if (result.token) {
          navigate("http://localhost:3000/dashboard")
        }
      })
    }
  },[])

  const hideLayoutRoute = [
    "/login",
    "/signup",
    "/signup/verify",
    "/signup/success",
  ];
  const shoudHideLayout = hideLayoutRoute.includes(location.pathname);

  const handleSignup = () => {
    if (typeof chrome !== undefined && chrome.tabs) {
      chrome.tabs.create({ url: "http://localhost:3000/signup#/signup" })
      window.close()
    }
  }

  const handleLogin = () => {
    if (typeof chrome !== undefined && chrome.tabs) {
      chrome.tabs.create({ url: "http://localhost:3000/login#/login" })
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

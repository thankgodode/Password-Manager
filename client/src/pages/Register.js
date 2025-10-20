/*global chrome*/

import logo from "../img/icon_48.png";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Router } from "react-router-dom";
import { useState, useEffect } from "react";
import FeaturesProvider from "../contexts/FeaturesProvider";
import ViewPasswordProvider from "../contexts/ViewPasswordContext";
import API from "../utils/api";
import Preloader from "../components/Preloader";

function Register() {
  const [isLoading, setIsLoading] = useState(true)
  
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    console.log("Checking extension")
    // if (typeof chrome !== undefined && chrome.tabs) {
    //   chrome.storage.local.get("token", async (result) => {
    //     try {
    //       if (result.token) {
    //         console.log("Logged in!")
    //         const auth = await API.get("/dashboard")
    //         navigate("/dashboard")
    //       }
    //     } catch (error) {
    //       return          
    //     }
    //   })
    // }
    const checkAuth = async () => {
      try {
        const auth = await API.get("/dashboard");
        navigate("/dashboard")
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
  
    checkAuth()
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

  const chromePreloader = () => {
    if (typeof chrome !== undefined && chrome.tabs) {
      return (
        <>
          {
            isLoading &&
            <content
              style={{
                zIndex: 4,
                background: "white",
                width: "100%",
                height: "100%"
              }}
            >
              <Preloader/>
            </content>
          }
        </>
      )
    }
  }

  return (
    <>
      {chromePreloader()}
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

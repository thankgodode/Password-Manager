import logo from "../img/icon_48.png";
import { Router } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

function Register() {
  const location = useLocation();

  const hideLayoutRoute = ["/login", "/signup"];
  const shoudHideLayout = hideLayoutRoute.includes(location.pathname);
  console.log(shoudHideLayout);

  return (
    <>
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
                <button className="btn signup">Signup</button>
              </Link>
              <Link to="login">
                <button className="btn login">Login</button>
              </Link>
            </content>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
}

export default Register;

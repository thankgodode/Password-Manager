import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="wrap">
        <Link to="/">
          <div className="back_ico top">
            <img src={back_icon} alt="Back icon" className="back" />
          </div>
        </Link>
        <div className="figure">
          <div class="title">
            <h1>Login</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="line large"></span>
              <span className="line small"></span>
            </div>
          </div>
          <form className="form">
            <input type="email" className="email st" placeholder="Email" />
            <input
              type="password"
              className="password st"
              placeholder="Password"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "right",
                width: "100%",
              }}
            >
              <Link to="/forgot_password">
                <h4
                  style={{
                    fontSize: "0.9rem",
                    margin: "10px 0",

                    cursor: "pointer",
                  }}
                >
                  Forgotten password?
                </h4>
              </Link>
            </div>
            <Link to="/dashboard">
              <button className="createBtn st">Login</button>
            </Link>
          </form>
          <div className="register_with">
            <span></span>
            <label>Or login with</label>
            <span></span>
          </div>
          <div className="google_ico">
            <img src={google_icon} alt="Google icon" />
          </div>
        </div>
      </div>
    </>
  );
}

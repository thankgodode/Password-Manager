import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "react"

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [err, setErr] = useState("")

  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: loginEmail,
        password: loginPassword
      })
      
      navigate("/dashboard")
    } catch (err) {
      console.log(err.response.data.msg)     
      setErr(true)
      setMsg(err.response.data.msg)
    }

  }

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
              <button className="createBtn st" onClick={loginUser}>Login</button>
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

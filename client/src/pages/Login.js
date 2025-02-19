import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../utils/api"
import axios from "axios"

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [err, setErr] = useState("")
  const [userData, setUserData] = useState("")
  
  const navigate = useNavigate()


  useEffect(() => {
    const checkAuth = async () => {
    try {
      const auth = await API.get("/dashboard")
      console.log("Redirecting to dashboard...")

      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      return
    }
  }
      
  checkAuth()
  }, [navigate])
  

  const loginUser = async (e) => {
    e.preventDefault()

    if (!loginEmail || !loginPassword) {
      setErr(true)
      setMsg("Input field(s) cannot be left blank :)")

      setTimeout(() => {
        setErr(false)
      }, 3000)
      
      return
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: loginEmail,
        password: loginPassword
      }, {
        withCredentials: true
      })
      
      localStorage.setItem("token", response.data.token)

      navigate("/dashboard")
    } catch (err) {
      setErr(true)
      
      if (err.response) {
        console.log(err.response.data.msg)     
        setMsg(err.response.data.msg)
      
      } else {
        console.log(err)     
        setMsg("Please check your internet connection :)")
      }


      setTimeout(() => {
        setErr(false)
      },3000)
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
          {/* <button onClick={checkAuth}>Refresh</button> */}
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
            <input
              type="email"
              className="email st"
              placeholder="Email"
              onInput={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              className="password st"
              placeholder="Password"
              onInput={(e) => setLoginPassword(e.target.value)}
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
            {/* <Link to="/dashboard"> */}
              <button className="createBtn st" onClick={loginUser}>Login</button>
            {/* </Link> */}
          </form>
          {err && <h4 style={{color:"red",textAlign:"center"}}>{msg}</h4>}
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

import { Link, Outlet, useLocation } from "react-router-dom";
import back_icon from "../img/arrow.svg";
import API from "../utils/api";

import { useState, useContext, useEffect } from "react";

import Preloader from "../components/Preloader";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import SuccessPage from "./SuccessPage";
import { MyContext } from "../contexts/FeaturesProvider";


export default function ForgotPassword() {
  const [userId, setUserId] = useState("")
  const [msg, setMsg] = useState("")
  
  useEffect(() => {
    setToggle("forgot-password")
  }, [])
  
  const {
    email, 
    setEmail,
    timeoutFunc,
    isLoading,
    setIsLoading,
    toggle,
    setToggle
  } = useContext(MyContext)

  const sendCode = async (e) => {
    e.preventDefault()

    if (email.length < 1) {
      setMsg("Input field cannot be left blank :)")

      setTimeout(() => {
        setMsg("")
      }, 3000)
      return
    }
    
    setIsLoading(true)
    try {
      const send = await API.post("http://localhost:5000/forgot-password", {
        email: email
      },
        { withCredentials: true }
      )

      setUserId(send.data.user._id)

      setToggle("verify")
      setIsLoading(false)
      timeoutFunc()
    } catch (error) {
      console.log(error)
      setIsLoading(false)

      if (!error.response || typeof error.response.data.msg !=="string" || !error.response.data) {
        setMsg("Please check your internet connection :)")

        setTimeout(() => {
          setMsg("")
        }, 3000)
        
        return
      }
      
      setTimeout(() => {
        setMsg("")
      }, 3000)

      setMsg(error.response.data.msg)
    }
    
  }

  return (
    <>
      {isLoading && <Preloader />}
      {toggle == "reset" &&
        <ResetPassword
          userId={userId}
        />}
      {toggle == "verify" &&
        <VerifyEmail
        verifyReset={true}
        userId={userId}
        />}
      {toggle == "forgot-password" &&
        <div className="wrap">
          <Link to="/login">
            <div className="back_ico top">
              <img src={back_icon} alt="Back icon" />
            </div>
          </Link>
          <div className="figure forgotten_password">
            <div class="title">
              <h1>Forgotten Password</h1>
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
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              {msg && <strong style={{ color: "red", textAlign: "center" }}>{msg}</strong>}
              <button className="createBtn st" onClick={(e) => sendCode(e)}>Verify email address</button>
            </form>
          </div>
        </div>
        }
      </>
  );
}

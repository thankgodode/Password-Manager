import { Link, Outlet, useLocation } from "react-router-dom";
import back_icon from "../img/arrow.svg";
import API from "../utils/api";

import { useState } from "react";

import Preloader from "../components/Preloader";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import UserInfoContext from "../contexts/UserInfoContext";


export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [toggle, setToggle] = useState('forgot-password')
  const [userId, setUserId] = useState("")
  const [msg, setMsg] = useState("")

  const sendCode = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const send = await API.post("http://localhost:5000/forgot-password", {
        email: email
      },
        { withCredentials: true }
      )
      
      console.log(send)
      setUserId(send.data.user._id)

      setToggle("verify")
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <>
      <UserInfoContext.Provider value={{email, userId, setUserId, toggle,setToggle}}>
        {isLoading && <Preloader />}
        {toggle == "reset" && <ResetPassword/>}
        {toggle == "verify" && <VerifyEmail verifyReset={true} />}
        {toggle === "forgot-password" && <div className="wrap">
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
              <button className="createBtn st" onClick={(e) => sendCode(e)}>Verify email address</button>
            </form>
          </div>
        </div>
          }
      </UserInfoContext.Provider>
    </>
  );
}

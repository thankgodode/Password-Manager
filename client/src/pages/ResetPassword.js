import { Outlet, Link } from "react-router-dom";

import back_icon from "../img/arrow.svg";
import API from "../utils/api";
import { useState, useContext} from "react";
import Preloader from "../components/Preloader";
import {MyContext} from "../contexts/FeaturesProvider";
import SuccessPage from "./SuccessPage";


export default function ResetPassword(props) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)

  const {
      minute,
      second,
      timeoutFunc,
      timedout,
      clearTimeout,
      setToggle,
      setIsLoading,
      email,
      msg,
      setMsg
  
  } = useContext(MyContext);
  
  const updatePassword = async (e, id) => {
    
    e.preventDefault()

    setIsLoading(true)

    if (password.length < 1 || confirmPassword.length < 1) {
      setError(true)

      setIsLoading(false)
      setMsg("Passwords do not match :)")

      setTimeout(() => {
        setMsg("")
        setError(false)
      },3000)
      return
    }

    if (password !== confirmPassword) {
      setError(true)

      setIsLoading(false)
      setMsg("Passwords do not match :)")

      setTimeout(() => {
        setMsg("")
        setError(false)
      },3000)
      return
    }

    try {
      const request = await API.post(`/forgot-password/reset-password/${id}`,
        {
          password: password
        },
        {withCredentials:true}
      )
      console.log(request)
      setIsLoading(false)

      setMsg("Password successfully changed!")
      setPasswordChanged(true)
    } catch (error) {
      console.log(error)
      setError(true)
      setIsLoading(false)
    } 
  }

  return (
    <>
      {passwordChanged && <SuccessPage msg={msg} />}
      {!passwordChanged &&
        <div className="wrap">
          <Link to="/login">
            <div className="back_ico top">
              <img src={back_icon} alt="Back icon" />
            </div>
          </Link>
          <div className="figure verify_password">
            <div class="title">
              <h1>Reset Password</h1>
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
                type="password"
                className="new_password st"
                placeholder="Enter new password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <input
                type="password"
                className="new_password st"
                placeholder="Confirm new password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
              {error && <strong>{msg}</strong>}
              <button className="reset_btn st"
                onClick={(e) => updatePassword(e, props.userId)}>Reset</button>
            </form>
          </div>
        </div>
      }
    </>
  );
}

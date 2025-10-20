/*global chrome*/

import back_icon from "../img/arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react"

import API from "../utils/api";
import Preloader from "./Preloader";
import axios from "axios";

export default function Setting(props) {
  const [msg, setMsg] = useState("")
  const [err, setErr] = useState("")

  const navigate = useNavigate()

  const handleLogout = async (setIsLoading) => {
    setIsLoading(true)
    try {
      setIsLoading(true)
      const auth = await axios.get("http://localhost:5000/logout", {withCredentials:true});
      
      // localStorage.removeItem("token")

      chrome.runtime.sendMessage(
        "ifhimppppnnffofkmagbggildngckaol",
        {
          type:"LOGOUT_SUCCESS"
        }
      )

      setMsg("User successfully logged out!")
      setIsLoading(false)
      navigate("/")

    } catch (error) {
      setIsLoading(false)
      setMsg("Sorry an unexpected error occured, please try again :)")

      setTimeout(() => {
        setMsg("")
      },3000)
      console.log(error)
    }
  };

  return (
    <>
      <div className="back_ico top" onClick={() => props.setToggleModal("dashboard")}>
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="figure setting_layout">
        <h1>Settings</h1>

        <div className="form">
          <div className="two_factor setting">
            <h3>Add security question</h3>
            <img src={back_icon} alt="Add" className="click" />
          </div>
          <div className="allow_autofill setting">
            <h3>Allow autop-input fill</h3>
            <div className="radio">
              <div className="toggle"></div>
            </div>
          </div>

          <div className="allow_input setting">
            <h3>Allow save input</h3>
            <div className="radio">
              <div className="toggle"></div>
            </div>
          </div>
          <Link>
            <button className="logout" onClick={() => handleLogout(props.setIsLoading)}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

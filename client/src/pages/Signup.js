import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import MyContext from "../contexts/MyContext";

import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Preloader from "../components/Preloader";
import VerifyEmail from "./VerifyEmail";
import SuccessPage from "./SuccessPage"

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("")
  const [err, setErr] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState("signup")

  const {
    timeoutFunc,
  } = useContext(MyContext)

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // const handleSignup = () => {
  //   window.open("http://localhost:5000/auth/google", "_self");
  // };

  const signup = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    try {
      const response = await axios.post("http://localhost:5000/register", {
        name: `${firstName} ${lastName}`,
        password: password,
        email: email,
      },{withCredentials:true});

      localStorage.setItem("email", email)
      setToggle("verify")
      timeoutFunc()

      setIsLoading(false)      
    } catch (err) {
      
      console.log(err)
      if (!err.response) {
        setMsg("Please check your internet connection :)")
        setIsLoading(false)

        setErr(true)
        setTimeout(() => {
          setErr(false)
        }, 3000)
        
        return;
      }

      console.log(err.response);
      setIsLoading(false)      
      setErr(true)
      setMsg(err.response.data.message)

      setTimeout(() => {
        setErr(false)
      }, 3000)
    }
  };

  return (
    <>
      {isLoading && <Preloader/>}
      {toggle == "signup" && <SignupUI
        signup={signup}
        handleFirstNam={handleFirstName}
        handleLastName={handleLastName}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        err={err}
        msg={msg}
      />}
      {toggle == "verify" &&
      <VerifyEmail
        toggle={toggle}
        setToggle={setToggle}
        email={email}
        />
      }
    </>
  );
}

function SignupUI(props) {
  return (
    <div className="wrap">
          <Link to="/">
            <div className="back_ico">
              <img src={back_icon} alt="Back icon" className="back" />
            </div>
          </Link>
          <div className="figure">
            <div class="title">
              <h1>Create account</h1>
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
                type="text"
                className="first_name st"
                placeholder="First name"
                onChange={props.handleFirstName}
              />
              <input
                type="text"
                className="last_name st"
                placeholder="Lastname name"
                onChange={props.handleLastName}
              />
              <input
                type="email"
                className="email st"
                placeholder="Email"
                onChange={props.handleEmail}
              />
              <input
                type="password"
                className="password st"
                placeholder="Password"
                onChange={props.handlePassword}
              />
              <button className="createBtn st" onClick={props.signup}>
                Create account
              </button>
              {props.err && <h4 style={{ color: "red", textAlign: "center" }}>{props.msg}</h4>}
            </form>
            <div className="register_with">
              <span></span>
              <label>Or register with</label>
              <span></span>
            </div>
            <div className="google_ico">
              <a className="button google">
                <img src={google_icon} alt="Google icon" />
              </a>
            </div>
          </div>
        </div>
  )
}
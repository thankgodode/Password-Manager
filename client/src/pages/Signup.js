import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import {MyContext} from "../contexts/FeaturesProvider";

import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Preloader from "../components/Preloader";
import VerifyEmail from "./VerifyEmail";
import SuccessPage from "./SuccessPage"
import { ViewPasswordContext } from "../contexts/ViewPasswordContext";


import{GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google"

import { validateSignup } from "../utils/validation";
import {handleSignupError} from "../utils/handleError"


export default function Signup() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

   const {
    isLoading,
    setIsLoading,
    msg,
    setMsg,
    error,
    setError,
    email,
    setEmail,
    toggle, 
     setToggle,
    timeoutFunc
  } = useContext(MyContext)


  useEffect(() => {
    setIsLoading(false)
    setToggle("signup")
  },[])

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

  const signup = async (e) => {
    e.preventDefault();

    const validate = validateSignup(firstName, lastName, password, email, setError, setMsg)
    
    if (validate) {
      return
    }


    if (!regex.test(password)) {
      setError(true)
      setMsg("Password must contain atleast an uppercase, lowercase and a special character")
      setTimeout(() => {
        setMsg("")
      }, 3000)

      return
    }
    


    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name: `${firstName} ${lastName}`,
        password: password,
        email: email,
      },
        {
          withCredentials: true 
      });

      setToggle("verify")
      timeoutFunc()

      setIsLoading(false)      
    } catch (err) {
      const handle = handleSignupError(err, setError, setMsg, setIsLoading)
      
      if (handle) {
        return
      }

      setIsLoading(false)      
      setError(true)
      setMsg(err.response.data.message)

      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  };

  return (
    <>
      {isLoading && <Preloader/>}

      {toggle == "signup" && <SignupUI
        signup={signup}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        setIsLoading={setIsLoading}
        err={error}
        msg={msg}
      />}

      {toggle == "signup" &&
        <SignupUI
          signup={signup}
          handleFirstName={handleFirstName}
          handleLastName={handleLastName}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          err={error}
          msg={msg}
        />
      }

      {toggle == "verify" &&
        <VerifyEmail
          email={email}
          verifyMail={true}
        />
      }
      {toggle == "success" && <SuccessPage msg={msg} />}
    </>
  );
}

function SignupUI(props) {
  const { viewPasswordFunc } = useContext(ViewPasswordContext)
  const navigate = useNavigate()
  
  
  const handleGooleAuth = async (credentialResonse) => {
    props.setIsLoading(true)
    
    try {
      const res = await axios.post("http://localhost:5000/api/signup/google", {
        token: credentialResonse.credential
      }, {
        withCredentials:true
      })

      if (res.data.exist) {
        alert("User with given email already exist :)")
        props.setIsLoading(false)
        return
      }
      
      localStorage.setItem("token", res.data.token)
      
      props.setIsLoading(false)
      navigate("/dashboard")
    } catch (error) {
      alert(error.response.data.msg)
      props.setIsLoading(false)
    }
  };

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
              <div style={{display:"flex",justifyContent:"space-between", background:"#e3d9ff", alignItems:"center", borderRadius:"8px"}}> 
              <input
                type="password"
                className="password st"
                placeholder="Password"
                onChange={props.handlePassword}
                />
              <span style={{display:"flex",justifyContent:"center", gap:"0.8rem", margin:"0 0.8rem 0 0"}}>
                <i onClick={viewPasswordFunc} style={{cursor:"pointer",color:"black"}} class="bi bi-eye-slash" id="togglePassword"></i>
              </span>
            </div>
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
            <button
              onClick={() => props.setIsLoading(true)}
              style={{
                width: "100%",
                border: "none",
                background: "white",
                margin:"1.2rem 0 0 0"
              }}
            >
              <GoogleOAuthProvider clientId="655477468553-7mnbs4qban6fu1v2gfcs8d2g8gfqbjp5.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGooleAuth}
                  onError={() => {
                    console.log("Login failed")
                  }}
                  />
              </GoogleOAuthProvider>
            </button>
            {/* <div className="google_ico" onClick={handleSignup}>
              <a className="button google">
                <img src={google_icon} alt="Google icon" />
              </a>
            </div> */}


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
          <div style={{display:"flex",justifyContent:"space-between", background:"#e3d9ff", alignItems:"center", borderRadius:"8px"}}> 
          <input
            type="password"
            className="password st"
            placeholder="Password"
            onChange={props.handlePassword}
            />
          <span style={{display:"flex",justifyContent:"center", gap:"0.8rem", margin:"0 0.8rem 0 0"}}>
            <i onClick={viewPasswordFunc} style={{cursor:"pointer",color:"black"}} class="bi bi-eye-slash" id="togglePassword"></i>
          </span>
        </div>
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

        <button
          onClick={() => props.setIsLoading(true)}
          style={{
            width: "100%",
            border: "none",
            background: "white",
            margin:"1.2rem 0 0 0"
          }}
        >
          <GoogleOAuthProvider clientId="655477468553-7mnbs4qban6fu1v2gfcs8d2g8gfqbjp5.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGooleAuth}
              onError={() => {
                console.log("Login failed")
              }}
              />
          </GoogleOAuthProvider>
        </button>
        {/* <div className="google_ico" onClick={handleSignup}>
          <a className="button google">
            <img src={google_icon} alt="Google icon" />
          </a>
        </div> */}

        <div className="google_ico">
          <a className="button google">
            <img src={google_icon} alt="Google icon" />
          </a>
        </div>
      </div>
    </div>
  )
}
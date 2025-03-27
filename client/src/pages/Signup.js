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

  // const handleSignup = () => {
  //   window.open("http://localhost:5000/auth/google", "_self");
  // };

  const signup = async (e) => {
    e.preventDefault();

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s]).+$/;
    
    if (!firstName || !lastName || !password || !email) {
      setError(true)
      setMsg("Input fields cannot be left empty")

       setTimeout(() => {
        setError(false)
       }, 3000)
      
      return
    }

    if (firstName.length < 3 || lastName.length < 3) {
      setError(true)
      setMsg("First/last name cannot be less than 5 characters")

      setTimeout(() => {
        setError(false)
      }, 3000)
      
      return
    }

    if (password.length < 8) {
      setError(true)
      setMsg("Password length must be greater than or equal to 8")
      setTimeout(() => {
        setMsg("")
      }, 3000)

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
      if (err.response.data.error) {
        setError(true)
        setMsg(err.response.data.error[0].msg)
        setIsLoading(false)

        setTimeout(() => {
          setError(false)
        }, 3000)
        
        return;  
      }
      
      if (!err.response) {
        setMsg("Please check your internet connection :)")
        setIsLoading(false)

        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3000)
        
        return;
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
        err={error}
        msg={msg}
      />}
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
  const {viewPasswordFunc} = useContext(ViewPasswordContext)

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
            <div className="google_ico">
              <a className="button google">
                <img src={google_icon} alt="Google icon" />
              </a>
            </div>
          </div>
        </div>
  )
}
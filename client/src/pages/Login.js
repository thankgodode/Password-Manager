import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../utils/api"
import axios from "axios"
import Preloader from "../components/Preloader";
import { MyContext } from "../contexts/FeaturesProvider";
import { ViewPasswordContext } from "../contexts/ViewPasswordContext";

import { GoogleOAuthProvider, GoogleLogin} from "@react-oauth/google";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const {viewPasswordFunc} = useContext(ViewPasswordContext)

  const {
    msg,
    setMsg,
    error,
    setError,
    isLoading,
    setIsLoading,
  } = useContext(MyContext)
  
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    const checkAuth = async () => {
      try {
        const auth = await API.get("/dashboard");
        setIsLoading(false)
        navigate("/dashboard")
      } catch (error) {
        // console.log(error)
        setIsLoading(false)
        localStorage.removeItem("token")
      }
    }
  
    checkAuth()
  }, [])

  const loginUser = async (e) => {
    e.preventDefault()  
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s]).+$/;
   
    if (!loginEmail || !loginPassword) {
      setError(true)
      setMsg("Input field(s) cannot be left blank :)")
      setIsLoading(false)

      setTimeout(() => {
        setError(false)
      }, 3000)
      
      return
    }

    //Front-end validation
    if (!loginEmail || !loginPassword) {
      setError(true)
      setMsg("Input field cannot be left blank")
      setTimeout(() => {
        setMsg("")
      }, 3000)

      return
    }

    if (loginPassword.length < 8) {
      setError(true)
      setMsg("Password length must be greater than or equal to 8")
      setTimeout(() => {
        setMsg("")
      }, 3000)

      return
    }

    if (!regex.test(loginPassword)) {
      setError(true)
      setMsg("Password must contain atleast an uppercase, lowercase and a special character")
      setTimeout(() => {
        setMsg("")
      }, 3000)

      return
    }

    setIsLoading(true)
    

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: (loginEmail).toLowerCase(),
        password: loginPassword
      }, {
        withCredentials: true
      })

      setIsLoading(false)
      console.log(response)
      // abbreviateName()

      localStorage.setItem("token", response.data.token)

      navigate("/dashboard")
    } catch (err) {
      setError(true)
      setIsLoading(false)

      console.log(err)

      if (!err.response || typeof err.response.data.msg !=="string" || !err.response.data) {
        setMsg("Please check your internet connection :)")

        setTimeout(() => {
          setMsg("")
        }, 3000)
        
        return
      }

      setMsg(err.response.data.msg)
      setTimeout(() => {
        setError(false)
      }, 3000)
    }

  }

  const handleGoogleAuth = async (credentialResonse) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login/google", {
        token: credentialResonse.credential
      })

      console.log("User logged in: ", res.data)
      localStorage.setItem("token", res.data.token)
      
      setIsLoading(false)
      
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      alert(error.response.data.msg)
      setIsLoading(false)
    }
  };

  return (
    <>
      <div className="wrap">
        {isLoading && <Preloader/>}
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
            <input
              type="email"
              className="email st"
              placeholder="Email"
              onInput={(e) => setLoginEmail(e.target.value)}
            />
            <div style={{display:"flex",justifyContent:"space-between", background:"#e3d9ff", alignItems:"center", borderRadius:"8px"}}> 
              <input
                type="password"
                className="password st"
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
                />
              <span style={{display:"flex",justifyContent:"center", gap:"0.8rem", margin:"0 0.8rem 0 0"}}>
                <i onClick={viewPasswordFunc} style={{cursor:"pointer",color:"black"}} class="bi bi-eye-slash" id="togglePassword"></i>
              </span>
            </div>
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
            <button className="createBtn st" onClick={loginUser}>Login</button>
          </form>
          {error && <h4 style={{color:"red",textAlign:"center"}}>{msg}</h4>}
          <div className="register_with">
            <span></span>
            <label>Or login with</label>
            <span></span>
          </div>
          <button
            onClick={() => setIsLoading(true)}
            style={{
              width: "100%",
              border: "none",
              background: "white",
              margin:"1.2rem 0 0 0"
            }}
          >
            <GoogleOAuthProvider clientId="655477468553-7mnbs4qban6fu1v2gfcs8d2g8gfqbjp5.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleAuth}
                onError={() => {
                  console.log("Login failed")
                }}
                />
            </GoogleOAuthProvider>
          </button>
          {/* <div className="google_ico">
            <img src={google_icon} alt="Google icon" />
          </div> */}
        </div>
      </div>
    </>
  );
}

import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../utils/api"
import axios from "axios"
import Preloader from "../components/Preloader";
import { MyContext } from "../contexts/FeaturesProvider";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const {
    msg,
    setMsg,
    error,
    setError,
    isLoading,
    setIsLoading,
    setProfileName

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

    setIsLoading(true)

    if (!loginEmail || !loginPassword) {
      setError(true)
      setMsg("Input field(s) cannot be left blank :)")
      setIsLoading(false)

      setTimeout(() => {
        setError(false)
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

  const abbreviateName = (name) => {
    let a = ""
    name.split(" ").forEach((el, i) => {
      a+=el[0].length > 0  ? el[0] : ""
    })

    setProfileName(a)
  }



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
            <button className="createBtn st" onClick={loginUser}>Login</button>
          </form>
          {error && <h4 style={{color:"red",textAlign:"center"}}>{msg}</h4>}
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

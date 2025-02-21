import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import MyContext from "../contexts/MyContext";

import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("")
  const [err, setErr] = useState(false)

  const {
    email,
    setEmail,
    timeoutFunc,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setUser,
    user,
    setPassword } = useContext(MyContext)

  const navigate = useNavigate();

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
      });

      localStorage.setItem("email", email)
      setUser(response.data.user)

      navigate("/signup/verify");
      timeoutFunc();

      setIsLoading(false)      
    } catch (err) {
      if (!err.response) {
        setMsg("Please check your internet connection :)")
        setIsLoading(false)

        setErr(true)
        setTimeout(() => {
          setErr(false)
        }, 3000)
        
        return;
      }

      console.log(err.response.data.message);
      setIsLoading(false)      
      setErr(true)
      setMsg(err.response.data.message)

      setTimeout(() => {
        setErr(false)
      }, 3000)
    }
  };

  const location = useLocation();

  const hideLayoutRoute = ["/signup", "/verify", "/success"];
  const shoudHideLayout = hideLayoutRoute.includes(location.pathname);

  return (
    <>
      {shoudHideLayout && (
        <div className="wrap">
          <Link to="/">
            <div className="back_ico">
              <img src={back_icon} alt="Back icon" className="back" />
            </div>
          </Link>
          <div className="figure">
            <div class="title">
              {isLoading && <Overlay />}
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
                onChange={handleFirstName}
              />
              <input
                type="text"
                className="last_name st"
                placeholder="Lastname name"
                onChange={handleLastName}
              />
              <input
                type="email"
                className="email st"
                placeholder="Email"
                onChange={handleEmail}
              />
              <input
                type="password"
                className="password st"
                placeholder="Password"
                onChange={handlePassword}
              />
              <button className="createBtn st" onClick={signup}>
                Create account
              </button>
              {err && <h4 style={{color:"red", textAlign:"center"}}>{msg}</h4>}
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
      )}
      <Outlet />
    </>
  );
}

function Overlay() {
  const styles = {
    height: "100vh",
  };

  return (
    <div
      className="modal"
      style={{
        height: "100vh",
        width: "100%",
        background: "grey",
        position: "fixed",
      }}
    >
      Loading...
    </div>
  );
}

import logo from "../img/icon_48.png";
import Login from "./Login";
import Signup from "./Signup";
import MyContext from "../contexts/MyContext";

import { Link, Outlet, useLocation } from "react-router-dom";
import { Router } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  
  const [second,setSeconds] = useState("00")
  const [minute, setMinutes] = useState("03")
  const [timedout, setTimedout] = useState(true)
  
  const timeoutFunc = () => {
    var minutes = 3;
    var seconds = 0

    setTimedout(false)

    const interval = setInterval(() => {
      seconds--;
    
      setTimedout(false);
      if (minutes < 1 && seconds < 0) {
        minutes = "3";
        seconds = "0";

        setMinutes(addZero(minutes));
        setSeconds(addZero(seconds));
        
        clearInterval(interval);
        setTimedout(true);
        return;
      } else if (minutes > 0 && seconds < 0) {
        seconds = 59;
        minutes--;
      }
    
      setMinutes(addZero(minutes));
      setSeconds(addZero(seconds));
      }, 1000);
    };
  
  function addZero(num) {
      return num < 10 ? "0" + num : num
  }
  
  const location = useLocation();

  const hideLayoutRoute = [
    "/login",
    "/signup",
    "/signup/verify",
    "/signup/success",
  ];
  const shoudHideLayout = hideLayoutRoute.includes(location.pathname);

  return (
    <>
      <MyContext.Provider
        value={{
          timeoutFunc,
          timedout,
          minute,
          setMinutes,
          second,
          setSeconds

    }}>
      {!shoudHideLayout && (
        <>
          <div className="blue"></div>
          <div className="white"></div>
          <div class="wrap">
            <content>
              <div className="img">
                <img src={logo} />
              </div>
              <Link to="signup">
                <button className="btn signup">Signup</button>
              </Link>
              <Link to="login">
                <button className="btn login">Login</button>
              </Link>
            </content>
          </div>
        </>
      )}
      <Outlet />
    </MyContext.Provider>
    </>
  );
}

export default Register;

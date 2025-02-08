import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axios from "axios";

import MyContext from "./contexts/MyContext";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Setting from "./components/Setting";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import SuccessPage from "./pages/SuccessPage";

function App() {
  const [user, setUser] = useState("");
  const [profiles, setProfiles] = useState("");
  const [timedout, setTimedout] = useState(true);
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("03");

  const sendMail = async (firstName, lastName, password, email) => {
    try {
      const request = await axios.post("http://localhost:5000/register", {
        name: `${firstName} ${lastName}`,
        password: password,
        email: email,
      });

      const response = await request;
      setCode(response.code);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const timeoutFunc = () => {
    var minute = 3;
    var seconds = 0;
    const interval = setInterval(() => {
      seconds--;

      setTimedout(false);
      if (minute < 0 && seconds < 0) {
        console.log("------ ", minute);

        clearInterval(interval);

        setTimedout(true);
        return;
      } else if (minutes > 0 && seconds < 0) {
        seconds = 59;
        minute--;
      }

      setMinutes(addZero(minute));
      setSeconds(addZero(seconds));
      console.log("Minutes: ", minute);
      console.log("Seconds: ", addZero(seconds));
    }, 1000);
  };

  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }

  return (
    <Router>
      <MyContext.Provider
        value={{
          timedout,
          setTimedout,
          sendMail,
          code,
          setCode,
          minutes,
          setMinutes,
          seconds,
          setSeconds,
          timeoutFunc,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<Register />}>
              <Route
                path="signup"
                element={
                  <Signup
                    setUser={setUser}
                    user={user}
                    profiles={profiles}
                    setProfiles={setProfiles}
                  />
                }
              >
                <Route path="verify" element={<VerifyEmail />} />
                <Route path="success" element={<SuccessPage />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Route>
            {/* <Route path="forgot_password" element={<ForgotPassword />}>
            <Route path="reset_password" element={<ResetPassword />} />
          </Route> */}
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </MyContext.Provider>
    </Router>
  );
}

export default App;

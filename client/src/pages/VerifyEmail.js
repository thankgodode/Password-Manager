import back_icon from "../img/arrow.svg";
import MyContext from "../contexts/MyContext";

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SuccessPage from "./SuccessPage";
import Preloader from "../components/Preloader";
import UserInfoContext from "../contexts/UserInfoContext";

export default function VerifyEmail(props) {
  const [inputCode, setInputCode] = useState("");
  const [enterInput, setEnterInput] = useState([])
  const [isPaste, setIsPaste] = useState(false)
  const [msg, setMsg] = useState("")
  const [error, setErr] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const {email, userId, toggle, setToggle} = useContext(UserInfoContext)

  
  const {
    minute,
    second,
    timeoutFunc,
    timedout,
    user
  } = useContext(MyContext);

  const pasteCode = (e) => {
    setIsPaste(true)

    const inputs = document.querySelectorAll(".input_code input");
    if (e.target.type == "text") {
      var data = e.clipboardData.getData("Text");

      data = data.split("");

      inputs.forEach((node, index) => {
        node.value = data[index];
        node.focus();
      });
      setInputCode(data.join(""))
    }
  };

  const deleteCode = () => {
    const inputs = document.querySelectorAll(".input_code input");
    inputs.forEach((node, index) => {
      node.addEventListener("keyup", (e) => {
        if (e.keyCode == 8) {
          if (!inputs[index - 1]) return;
          inputs[index - 1].focus();
          setEnterInput(enterInput.filter((el, i) => index !== i))
        }
      });

      if (node.value.length > 0) {
        if (!inputs[index + 1]) return;
        inputs[index + 1].focus();
      }
    });
  };

  const verifyEmail = async (email) => {
    
    setIsLoading(true)
    try {
      const response = await axios.post(`http://localhost:5000/verify`, {
        inputCode: isPaste ? inputCode : enterInput.join(""),
        email
      },
        {
          withCredentials: true
          
        });

      setToggle("success")
      setIsLoading(false)
    } catch (err) {
      if (!err.response.data) {
        setErr(true)
        setMsg("Please reconnect to the internet :)")

        setTimeout(() => {
          setErr(false)
        }, 3000)
      }

      console.log("Error ", err.response.data.msg);
      setErr(true)
      setMsg(err.response.data.msg)

      setTimeout(() => {
        setErr(false)
      }, 3000)
      
      setIsLoading(false)
    }
  };

  const verifyResetEmail = async (id) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`http://localhost:5000/forgot-password/verify/${id}`, {
        inputCode: isPaste ? inputCode : enterInput.join(""),
      },
        {
          withCredentials: true
      });

      setToggle("reset")
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      
      if (!err.response) {
        setErr(true)
        setMsg("Please reconnect to the internet :)")

        setTimeout(() => {
          setErr(false)
        }, 3000)
      }

      setErr(true)
      setMsg(err.response.data.msg)

      setTimeout(() => {
        setErr(false)
      }, 3000)
      
      setIsLoading(false)
    }
  }

  const resendCode = async (email) => {
    try {
      const response = await axios.post("http://localhost:5000/send_code",
        { email: email }, { withCredentials: true }
      )
      setTimeout(() => {
        timeoutFunc()
      }, 1000)
      
    } catch (err) {
      console.log(err)
      if (!err.response) {
        setMsg("Please reconnect to WIFI :)");

        setTimeout(() => {
          setErr(false)
        }, 3000)
      }

      setTimeout(() => {
          setErr(false)
      }, 3000)
      
      setMsg(err.response.data.message)
    }
  }

  const navigateBack = () => {
    window.location.href="/signup"
    window.location.reload()

  }

  return (
    <>
      {isLoading && <Preloader/>}
        <div className="wrap" onInput={deleteCode} onPaste={pasteCode}>
          <div className="back_ico top" onClick={navigateBack}>
            <img src={back_icon} alt="Back icon" />
          </div>
          <div className="figure verify_password">
            <div class="title">
              <h1>Verify Email</h1>
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
            <p>Verify email address to proceed</p>
            <h3>Enter the 4 digit code sent to your mail {email}</h3>
            <div className="input_code">
              <input type="text" inputMode="numeric" maxlength="1" onInput={(e) => setEnterInput([e.target.value])} />
              <input type="text" inputMode="numeric" maxlength="1" onInput={(e) => setEnterInput([...enterInput, e.target.value])} />
              <input type="text" inputMode="numeric" maxlength="1" onInput={(e) => setEnterInput([...enterInput, e.target.value])} />
              <input type="text" inputMode="numeric" maxlength="1" onInput={(e) => setEnterInput([...enterInput, e.target.value])} />
            </div>
            <p>
              Code expires in:{" "}
              <strong>
                {minute}:{second}s
              </strong>
            </p>
            <label>
              Didn't get code? {timedout && <span style={{ cursor: "pointer" }} onClick={() => {
                resendCode(email)
              }}>Send code again.</span>}
            </label>
            {error && <h4 style={{ color: "red" }}>{msg}</h4>}
            {props.verifyMail && <button className="verify_btn st" onClick={() => props.verifyEmail(email)}>
              Verify email address
            </button>}

            {props.verifyReset && <button className="verify_btn st" onClick={() => verifyResetEmail(userId)}>
              Verify email address
            </button>}
          </div>
        </div>
      {toggle == "success" && <SuccessPage />}
    </>
  );
}

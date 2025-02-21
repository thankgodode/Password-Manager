import back_icon from "../img/arrow.svg";
import MyContext from "../contexts/MyContext";

import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

export default function VerifyEmail() {
  const [inputCode, setInputCode] = useState("");
  const [enterInput, setEnterInput] = useState([])
  const [isPaste, setIsPaste] = useState(false)
  const [msg, setMsg] = useState("")
  const [error, setErr] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const email = localStorage.getItem("email")
    if (!email) {
      navigate("/signup")
    }
  }, [])

  const {
    minute,
    second,
    timeoutFunc,
    timedout,
    user
  } = useContext(MyContext);

  const navigate = useNavigate();

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
          setEnterInput(enterInput.filter((el, i) => index!==i))
        }
      });

      if (node.value.length > 0) {
        if (!inputs[index + 1]) return;
        inputs[index + 1].focus();
      }
    });
  };

  const verifyEmail = async () => {
    const email = localStorage.getItem("email");

    try {
      const response = await axios.post(`http://localhost:5000/verify`, {
        inputCode: isPaste ? inputCode : enterInput.join(""),
        email
      },
        {
          withCredentials: true 
          
      });
      
      // setMsg(response.data.message)
      navigate("/signup/success");

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
    }
  };

  const resendCode = async () => {
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
    navigate("/signup")
    window.location.reload()

  }

  useEffect(() => {
    setEmail(localStorage.getItem("email"))
  }, []);

  return (
    <>
      <div className="wrap" onInput={deleteCode} onPaste={pasteCode}>
        {/* <Link to="/signup"> */}
          <div className="back_ico top" onClick={navigateBack}> 
            <img src={back_icon} alt="Back icon" />
          </div>
        {/* </Link> */}
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
            <input type="text" inputMode="numeric" maxlength="1" onInput={(e) => setEnterInput([e.target.value])}/>
            <input type="text" inputMode="numeric" maxlength="1" onInput={(e) => setEnterInput([...enterInput, e.target.value])}/>
            <input type="text" inputMode="numeric" maxlength="1" onInput={(e) =>setEnterInput([...enterInput, e.target.value])}/>
            <input type="text" inputMode="numeric" maxlength="1" onInput={(e) => setEnterInput([...enterInput, e.target.value])}/>
          </div>
          <p>
            Code expires in:{" "}
            <strong>
              {minute}:{second}s
            </strong>
          </p>
          <label>
            Didn't get code? {timedout && <span style={{cursor:"pointer"}} onClick={() => {
              resendCode()
            }}>Send code again.</span>}
          </label>
           {error && <h4 style={{color:"red"}}>{msg}</h4>}
          {/* <Link to="/forgot_password/reset_password"> */}
          <button className="verify_btn st" onClick={verifyEmail}>
            Verify email address
          </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
}

import back_icon from "../img/arrow.svg";
import { Outlet, Link } from "react-router-dom";

export default function VerifyEmail() {
  const pasteCode = (e) => {
    const inputs = document.querySelectorAll(".input_code input");

    if (e.target.type == "text") {
      var data = e.clipboardData.getData("Text");

      data = data.split("");

      inputs.forEach((node, index) => {
        node.value = data[index];
        node.focus();
      });
    }
  };

  const deleteCode = () => {
    const inputs = document.querySelectorAll(".input_code input");

    inputs.forEach((node, index) => {
      node.addEventListener("keyup", (e) => {
        if (e.keyCode == 8) {
          if (!inputs[index - 1]) return;
          inputs[index - 1].focus();
        }
      });

      if (node.value.length > 0) {
        if (!inputs[index + 1]) return;
        inputs[index + 1].focus();
      }
    });
  };

  return (
    <>
      <div className="wrap" onInput={deleteCode} onPaste={pasteCode}>
        <Link to="/forgot_password">
          <div className="back_ico top">
            <img src={back_icon} alt="Back icon" />
          </div>
        </Link>
        <div className="figure verify_password">
          <div class="title">
            <h1>Forgot Password</h1>
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
          <h3>Enter the 4 digit code sent to your mail ode*****@gmail.com</h3>
          <div className="input_code">
            <input type="text" inputMode="numeric" maxlength="1" />
            <input type="text" inputMode="numeric" maxlength="1" />
            <input type="text" inputMode="numeric" maxlength="1" />
            <input type="text" inputMode="numeric" maxlength="1" />
          </div>
          <p>
            Code expires in: <strong>3:00s</strong>
          </p>
          <label>
            Didn't get code? <strong> Send code again.</strong>
          </label>
          <Link to="/forgot_password/reset_password">
            <button className="verify_btn st">Verify email address</button>
          </Link>
        </div>
      </div>
    </>
  );
}

import { Outlet, Link } from "react-router-dom";
import back_icon from "../img/arrow.svg";

export default function ResetPassword() {
  return (
    <>
      <div className="wrap">
        <Link to="/forgot_password">
          <div className="back_ico top">
            <img src={back_icon} alt="Back icon" />
          </div>
        </Link>
        <div className="figure verify_password">
          <div class="title">
            <h1>Reset Password</h1>
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
              type="password"
              className="new_password st"
              placeholder="Enter new password"
            />
            <input
              type="password"
              className="new_password st"
              placeholder="Confirm new password"
            />
            <Link to="/success">
              <button className="reset_btn st">Reset</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

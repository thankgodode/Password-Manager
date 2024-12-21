import back_icon from "../img/arrow.svg";
import google_icon from "../img/google.svg";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
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
            />
            <input
              type="text"
              className="last_name st"
              placeholder="Lastname name"
            />
            <input type="email" className="email st" placeholder="Email" />
            <input
              type="password"
              className="password st"
              placeholder="Password"
            />
            <button className="createBtn st">Create account</button>
          </form>
          <div className="register_with">
            <span></span>
            <label>Or register with</label>
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

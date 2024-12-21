import { Link, Outlet, useLocation } from "react-router-dom";
import back_icon from "../img/arrow.svg";

export default function ForgotPassword() {
  const location = useLocation();
  console.log(location);
  const hideLayoutRoute = [
    "/forgot_password/reset_password",
    "/forgot_password/verify_email",
  ];
  const showLayoutRoute = hideLayoutRoute.includes(location.pathname);
  return (
    <>
      {!showLayoutRoute && (
        <>
          <div className="wrap">
            <Link to="/login">
              <div className="back_ico top">
                <img src={back_icon} alt="Back icon" />
              </div>
            </Link>
            <div className="figure forgotten_password">
              <div class="title">
                <h1>Forgotten Password</h1>
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
                  placeholder="Enter email address"
                />
                <Link to="verify_email">
                  <button className="createBtn st">Verify email address</button>
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
}

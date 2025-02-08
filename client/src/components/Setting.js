import back_icon from "../img/arrow.svg";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Setting(props) {
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then((response) => {
        // setUser(null)
        console.log(response);
        window.location.href = "/signup";
      })
      .catch((err) => console.log("Error ", err));
  };

  return (
    <>
      <div className="back_ico top" onClick={() => props.setToggleModal("")}>
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="figure setting_layout">
        <h1>Settings</h1>

        <div className="form">
          <div className="two_factor setting">
            <h3>Add security question</h3>
            <img src={back_icon} alt="Add" className="click" />
          </div>
          <div className="allow_autofill setting">
            <h3>Allow autop-input fill</h3>
            <div className="radio">
              <div className="toggle"></div>
            </div>
          </div>

          <div className="allow_input setting">
            <h3>Allow save input</h3>
            <div className="radio">
              <div className="toggle"></div>
            </div>
          </div>
          <Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

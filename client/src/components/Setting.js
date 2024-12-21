import back_icon from "../img/arrow.svg";
import { Link } from "react-router-dom";

export default function Setting(props) {
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
          <Link to="/login">
            <button className="logout">Logout</button>
          </Link>
        </div>
      </div>
    </>
  );
}

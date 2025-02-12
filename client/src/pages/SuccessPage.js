import { Link } from "react-router-dom";
import check_ico from "../img/complete.svg";
import back_icon from "../img/arrow.svg";

export default function SuccessPage() {
  return (
    <>
      <div className="wrap">
        <Link to="/">
          <div className="back_ico">
            <img src={back_icon} alt="Back icon" className="back" />
          </div>
        </Link>
        <content>
          <img
            src={check_ico}
            className="success_icon"
            alt="Success Icon"
            style={{ width: "350px" }}
          />
          <h1 style={{ color: "green", textAlign: "center" }}>
            Successfully created account!
          </h1>
        </content>
      </div>
    </>
  );
}

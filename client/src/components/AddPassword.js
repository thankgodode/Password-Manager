import back_icon from "../img/arrow.svg";

export default function AddPassword(props) {
  return (
    <>
      {/* <div className="back_ico top">
          <img src={back_icon} alt="Back icon" />
        </div> */}
      <div className="figure add_password">
        <h2>Add Password</h2>

        <div className="form password">
          <label for="add_s">Enter site name</label>
          <input id="add_s" type="text" className="add_s st" />
          <label for="add_n">Enter username</label>
          <input id="add_n" type="text" className="add_n st" />
          <label for="add_p">Enter password</label>
          <input id="add_p" type="password" className="add_p st" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <button className="save_p proceed">Add</button>
            <button
              className="close_p cancel"
              onClick={() => props.setToggleModal("")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

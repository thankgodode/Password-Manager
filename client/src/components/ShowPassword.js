import back_icon from "../img/arrow.svg";

export default function ShowPassword() {
  return (
    <>
      <div className="back_ico">
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="figure">
        <div className="title">
          <h1>Site Name</h1>
          <form className="form show_password">
            <label>Email</label>
            <input
              type="text"
              className="username st"
              value="dtech101"
              disabled
            />
            <label>Password</label>
            <input
              type="password"
              className="password st"
              value="********"
              disabled
            />
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                gap: "0.6rem",
              }}
            >
              <button className="edit proceed">Edit</button>
              <button className="close cancel">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

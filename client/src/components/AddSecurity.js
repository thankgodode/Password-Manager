import back_icon from "../img/arrow.svg";

export default function AddSecurity() {
  return (
    <>
      <div className="back_ico top">
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="figure add_security">
        <h1>Add Security Question</h1>
        <div className="drop_down">
          <label>Choose security question</label>
          <img src={back_icon} className="click" />
        </div>
        <div className="list">
          <ul>
            <li>What's your mothers name?</li>
            <li>What's your favorite food?</li>
            <li>How old are you?</li>
            <li>When did your parents got married?</li>
          </ul>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="add_question">Add quesion</button>
        </div>
        <br />
        <div
          style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
        >
          <input
            type="text"
            className="input_question"
            placeholder="Enter answer..."
          />
          <button className="save_question input">Save</button>
        </div>
      </div>
    </>
  );
}

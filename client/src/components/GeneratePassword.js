import { useState } from "react";
import back_icon from "../img/arrow.svg";

export default function GeneratePassword(props) {
  const [uppL, setUppL] = useState(false);
  const [lowL, setLowL] = useState(false);
  const [symb, setSymb] = useState(false);
  const [num, setNum] = useState(false);
  const [length, setLength] = useState(8);
  const [pwd, setPwd] = useState("");
  const [copy, setCopy] = useState(false);

  function generatePassword() {
    const crypto = window.crypto;
    var uppChar = uppL ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    var lowChar = lowL ? "abcdefghijklmnopqrstuvwxyz" : "";
    var number = num ? "0123456789" : "";
    var symbols = symb ? `!@#$%^&*()_+{}|:[]=_;'",<.>/?\\` : "";
    var randomValues = crypto.getRandomValues(new Uint32Array(length));
    var allCharacters = `${uppChar}${lowChar}${number}${symbols}`;
    var password = "";

    if (!uppL && !lowL && !symb && !num) {
      return setPwd(
        <span style={{ color: "red" }}>
          Please select characters to be used
        </span>
      );
    }

    for (const value of randomValues) {
      password += allCharacters[value % allCharacters.length];
    }

    console.log(allCharacters);
    setPwd(password);
  }

  return (
    <>
      <div className="back_ico top" onClick={() => props.setToggleModal("dashboard")}>
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="figure generate_password">
        <h2>Generate Password</h2>

        <div className="form password">
          <>
            <PasswordGenerated pwd={pwd} copy={copy} />
          </>
          <button onClick={generatePassword}>Generate Password</button>
          <PasswordLength setLength={setLength} />
          <div
            style={{
              display: "flex",
              margin: "1.5rem 0 0 0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label>Characters Used:</label>
          </div>
          <PasswordFormat
            setUppL={setUppL}
            setLowL={setLowL}
            setSymb={setSymb}
            setNum={setNum}
          />
        </div>
      </div>
    </>
  );
}

function PasswordGenerated(props) {
  const [isCopy, setIsCopy] = useState("Copy");

  function copy() {
    navigator.clipboard.writeText(props.pwd);
    setTimeout(() => {
      setIsCopy("Copy");
    }, 3000);

    setIsCopy("Copied");
  }

  return (
    <>
      <div className="generated_password">
        <span>{props.pwd}</span>
        <button className="copy" onClick={copy}>
          {isCopy}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </>
  );
}

function PasswordLength(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.4rem",
          alignItems: "center",
          margin: "1.5rem 0 0 0",
          background: "#9e7dff",
          padding: "0.8rem 0.1rem",
          borderRadius: "10px",
        }}
      >
        <label>Password Length:</label>
        <input
          onInput={(e) => props.setLength(e.target.value)}
          type="number"
          min="8"
          max="24"
          placeholder="8"
          className="password_length"
          style={{
            width: "60px",
            height: "30px",
            border: "none",
            textIndent: "0.5rem",
            fontSize: "1rem",
          }}
        />
      </div>
    </>
  );
}

function PasswordFormat(props) {
  return (
    <>
      <div
        className="password_format"
        style={{
          background: "#9e7dff",
          padding: "0.8rem 0.7rem",
          borderRadius: "10px",
        }}
      >
        <div>
          <input
            type="checkbox"
            className="format upperAlph"
            id="upperAlph"
            onClick={(e) => {
              props.setUppL(e.target.checked);
            }}
          />
          <label for="upperAlph">ABC</label>
        </div>
        <div>
          <input
            type="checkbox"
            className="format lowerAlph"
            id="lowerAlph"
            onClick={(e) => {
              props.setLowL(e.target.checked);
            }}
          />
          <label for="lowerAlph">abc</label>
        </div>
        <div>
          <input
            type="checkbox"
            className="format nums"
            id="nums"
            onClick={(e) => {
              props.setNum(e.target.checked);
            }}
          />
          <label for="nums">123</label>
        </div>
        <div>
          <input
            type="checkbox"
            className="format symbols"
            id="symbols"
            onClick={(e) => {
              props.setSymb(e.target.checked);
            }}
          />
          <label for="symbols">!@#</label>
        </div>
      </div>
    </>
  );
}

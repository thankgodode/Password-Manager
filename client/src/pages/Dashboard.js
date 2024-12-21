import setting_ico from "../img/setting.svg";
import { useState } from "react";
import GeneratePassword from "../components/GeneratePassword";
import SavedPassword from "../components/SavedPassword";
import AddPassword from "../components/AddPassword";
import Setting from "../components/Setting";

export default function Dashboard() {
  const [toggleModal, setToggleModal] = useState("");

  function toggleSavedPassword() {
    setToggleModal("saved");
  }

  function toggleGeneratePassword() {
    setToggleModal("generate");
  }

  function toggleAddPassword() {
    setToggleModal("add");
  }

  function openSetting() {
    setToggleModal("setting");
  }

  return (
    <>
      {toggleModal == "add" || toggleModal == "generate" ? (
        <div className="modal"></div>
      ) : (
        ""
      )}
      {toggleModal == "saved" || toggleModal == "setting" ? (
        <div className="white_layout"></div>
      ) : (
        ""
      )}
      <div className="wrap">
        <div className="header top">
          <div className="name nav">
            <h3>TO</h3>
          </div>
          <div className="settings nav" onClick={openSetting}>
            <img src={setting_ico} alt="setting" />
          </div>
        </div>
        <div className="figure dashboard">
          <div style={{ margin: "30px 0 0 0" }}>
            <button className="save password" onClick={toggleSavedPassword}>
              Save Password
            </button>
            <button
              className="generate password"
              onClick={toggleGeneratePassword}
            >
              Generate Password
            </button>
            <button className="add password" onClick={toggleAddPassword}>
              Add Password
            </button>
          </div>
        </div>
        {toggleModal == "saved" && (
          <SavedPassword setToggleModal={setToggleModal} />
        )}
        {toggleModal == "generate" && (
          <GeneratePassword setToggleModal={setToggleModal} />
        )}
        {toggleModal == "add" && (
          <AddPassword setToggleModal={setToggleModal} />
        )}
        {toggleModal == "setting" && (
          <Setting setToggleModal={setToggleModal} />
        )}
      </div>
    </>
  );
}

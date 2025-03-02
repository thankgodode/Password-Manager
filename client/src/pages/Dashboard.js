import setting_ico from "../img/setting.svg";
import { useState,useEffect } from "react";
import GeneratePassword from "../components/GeneratePassword";
import SavedPassword from "../components/SavedPassword";
import AddPassword from "../components/AddPassword";
import Setting from "../components/Setting";

import { AuthContext } from "../contexts/AuthProvider";
import API from "../utils/api";

import { useNavigate } from "react-router-dom";
import Preloader from "../components/Preloader";

export default function Dashboard() {
  const [toggleModal, setToggleModal] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

    useEffect(() => {
        console.log("Dashboard page...")
        const checkAuth = async () => {
          try {
            const auth = await API.get("/dashboard");
            setToggleModal("dashboard")
            setIsLoading(false)
            console.log("User authorization successfully")
          } catch (error) {
            console.log(error)
            localStorage.removeItem("token")
            navigate("/login")  
          }
        }
  
      checkAuth()
    }, [navigate])

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
      {isLoading && <Preloader/>}
      {toggleModal == "add" || toggleModal == "generate" ? (
        <div className="modal"></div>
      ) : (
        ""
      )}
      {/* {toggleModal == "saved" || toggleModal == "setting" ? (
        <div className="white_layout" style={{position:"relative"}}></div>
      ) : (
        ""
      )} */}
      <div className="wrap">
        {toggleModal == "dashboard" &&
          <>
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
          </>
        }
        {toggleModal == "saved" && (
          <SavedPassword setToggleModal={setToggleModal} />
        )}
        {toggleModal == "generate" && (
          <GeneratePassword setToggleModal={setToggleModal} isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
        {toggleModal == "add" && (
          <AddPassword setToggleModal={setToggleModal} isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
        {toggleModal == "setting" && (
          <Setting setToggleModal={setToggleModal} isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </div>
    </>
  );
}

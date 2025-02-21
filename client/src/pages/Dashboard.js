import setting_ico from "../img/setting.svg";
import { useState,useEffect } from "react";
import GeneratePassword from "../components/GeneratePassword";
import SavedPassword from "../components/SavedPassword";
import AddPassword from "../components/AddPassword";
import Setting from "../components/Setting";

import API from "../utils/api"
import { AuthContext } from "../contexts/AuthProvider";

import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function Dashboard() {
  const [toggleModal, setToggleModal] = useState("");
  const {isAuthenticated,setIsAuthenticated,profile,setProfile} = useState(AuthContext)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await API.get("/dashboard");
        console.log("User authorization successfully")

        setIsAuthenticated(true)
        // const auth = await axios.get("http://localhost:5000/dashboard", 
        //   {
        //     withCredentials: true,
        //     headers: {
        //     "Authorization":`Bearer ${token}`,
        //   }},
          
        //   console.log("Successfully authorized")
        // );
        
      } catch (error) {
        console.log(error)
        localStorage.removeItem("token")
        setIsAuthenticated(false)
      }
    }

    checkAuth()
      
  }, [])


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

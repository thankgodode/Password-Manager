import back_icon from "../img/arrow.svg";
import search_icon from "../img/search.svg";

import API from "../utils/api"

import {useState, useEffect} from "react"
import ShowPassword from "./ShowPassword";
import EditPassword from "./EditPassword";

export default function SavedPassword(props) {
  const [savedPassword, setSavedPassword] = useState("")
  const [info, setInfo] = useState("")
  const [toggleModal, setToggleModal] = useState("saved")
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState()
  const [id, setId] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    const getPasswords = async() => {
      try {
        const response = await API.get("/dashboard/get");
        console.log(response.data.userData)

        setLoading(false)
        if (!response.data.usersData || response.data.usersData.data.length<1) {
          setSavedPassword("empty")
          return
        }

        setSavedPassword(response.data.usersData)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
    }

    getPasswords()
  }, [])

  const showData = (el,i,id) => {
    setToggleModal("show")
    setInfo(el)
    setIndex(i)
    setId(id)
  }

  return (
    <>
      {toggleModal == "show" && <ShowPassword info={info} id={id} setToggleModal={setToggleModal} savedPassword={savedPassword} setSavedPassword={setSavedPassword} />}
      {toggleModal == "edit" && <EditPassword info={info} index={index} setToggleModal={setToggleModal} setInfo={setInfo} setSavedPassword={setSavedPassword} />}
      {toggleModal ==="saved" &&
        <>
          <div className="back_ico top" onClick={() => props.setToggleModal("dashboard")}>
            <img src={back_icon} alt="Back icon" />
          </div>
          <div className="search">
            <input type="text" placeholder="Search here" className="v" />
            <img src={search_icon} alt="Search icon" className="v" />
          </div>
          <div class="saved_passwords">
          <button style={
            {
              background: "blue",
              color:"white",
              border: "none",
              outline: "none",
              padding: "0.1rem 0",
              // width: "50px",
              cursor: "pointer",
              fontSize: "2rem",
              borderRadius:"5px"
              
            }}
            onClick={() => props.setToggleModal("add")}
          >
            +
          </button>
          {loading && <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>Loading...</span>}
          {error && <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>Sorry, an unexpected error occured</span>}
          {savedPassword == "empty" ? "There is no saved password here :(" : ""}
          {savedPassword.data ? 
            savedPassword.data.map((el, i) =>
              <div onClick={() => showData(el,i,el._id)} key={i}>
                <h3>{el.site.split(".")[0]}</h3>
              </div>
            )
          :""}  
        </div>
      </>
      }
      {}
    </>
  );
}

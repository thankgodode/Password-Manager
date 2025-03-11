import back_icon from "../img/arrow.svg";
import API from "../utils/api";
import Preloader from "./Preloader"
import {useState} from "react"

export default function ShowPassword(props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const deletePassword = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const response = await API.delete(`/dashboard/delete/${props.id}`)
      console.log(props.savedPassword)
      const filter = props.savedPassword.data.filter((el, i) => el._id !== props.id)

      props.setSavedPassword({data:filter})
      props.setToggleModal("saved")

      if (filter.length < 1) {
        props.setSavedPassword("empty")
      }
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
      alert("Something went wrong, try checking your internet connection :(")
    }
  }

  return (
    <>
      {loading && <Preloader />}
      <div className="back_ico" onClick={() => props.setToggleModal("saved")}>
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="figure">
        <div className="title">
          <h1>{props.info.site}</h1>
          <form className="form show_password">
            <label>Username</label>
            <input
              type="text"
              className="username st"
              value={props.info.username}
              disabled
            />
            <label>Password</label>
            <input
              type="password"
              className="password st"
              value={props.info.password}
              disabled
            />
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                gap: "0.6rem",
              }}
            >
              <button className="edit proceed" onClick={() => props.setToggleModal("edit")}>Edit</button>
              <button className="close cancel" onClick={deletePassword}>Delete</button>
            </div>
            {error && <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>Sorry, an unexpected error occured :(</span>}
          </form>
        </div>
      </div>
    </>
  );
}

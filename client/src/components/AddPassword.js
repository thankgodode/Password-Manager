import back_icon from "../img/arrow.svg";
import { Link } from "react-router-dom"

import API from "../utils/api"
import {useState, useEffect} from "react"
import Preloader from "./Preloader";


export default function AddPassword(props) {
  // return (

  //   <>
  //     {/* <div className="back_ico top">
  //         <img src={back_icon} alt="Back icon" />
  //       </div> */}
  //     <div className="figure add_password">
  //       <h2>Add Password</h2>

        // <div className="form password">
        //   <label for="add_s">Site</label>
        //   <input id="add_s" type="text" className="add_s st" />
        //   <label for="add_n">Username</label>
        //   <input id="add_n" type="text" className="add_n st" />
        //   <label for="add_p">Password</label>
        //   <input id="add_p" type="password" className="add_p st" />
        //   <div
        //     style={{
        //       display: "flex",
        //       justifyContent: "center",
        //       gap: "0.5rem",
        //       width: "100%",
        //     }}
        //   >
        //     <button className="save_p proceed">Add</button>
        //     <button
        //       className="close_p cancel"
        //       onClick={() => props.setToggleModal("dashboard")}
        //     >
        //       Close
        //     </button>
        //   </div>
        // </div>
  //     </div>
  //   </>
  // );

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [site, setSite] = useState("")
  const [addBtn, setAddBtn] = useState("Add")
  const [loading, setLoading] = useState(false)

  const addPassword = async (e) => {
    setLoading(true)

    e.preventDefault()

    setAddBtn("Adding password...")

    try {
      const response = await API.post("/dashboard/create",
        {
          site,
          username,
          password
        },
        {
        withCredentials:true
        })
      
      props.setToggleModal("saved")
      
      setLoading(false)
      setSite("")
      setUsername("")
      setPassword("")
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      {loading && <Preloader />}
      <div className="back_ico top" onClick={() => props.setToggleModal("dashboard")}>
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="figure add_password">
        <h2>Add Password</h2>

        <form className="form">
            <label for="add_s">Site</label>
            <input id="add_s" type="text" className="add_s st" 
              onChange={(e)=> setSite(e.target.value)}
              value={site}
            />
            <label for="add_n">Username</label>
            <input id="add_n" type="text" className="add_n st" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <label for="add_p">Password</label>
            <input id="add_p" type="password" className="add_p st" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
              }}
            >
            <button className="save_p proceed"
              onClick={addPassword}>{addBtn}</button>
              {/* <button
                className="close_p cancel"
                onClick={() => props.setToggleModal("dashboard")}
              >
                Close
              </button> */}
            </div>
          </form>
      </div>
    </>
  )
}

import back_icon from "../img/arrow.svg";
import { Link } from "react-router-dom"

import API from "../utils/api"
import {useState, useEffect, useContext} from "react"
import Preloader from "./Preloader";
import { ViewPasswordContext } from "../contexts/ViewPasswordContext";


export default function AddPassword(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [site, setSite] = useState("")
  const [addBtn, setAddBtn] = useState("Add")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState("")

  const {viewPasswordFunc} = useContext(ViewPasswordContext)

  const addPassword = async (e) => {
    e.preventDefault()

    if (!username || !password || !site) {
      setError(true)
      setMsg("Input fields cannot be left blank :(")

      setTimeout(() => {
        setError(false)
      },3000)
      return
    }

    if (password.length < 8) {
      setError(true)
      setMsg("Password cannot be less than 8 characters")

      setTimeout(() => {
        setError(false)
      },3000)
      return
    }

    setLoading(true)


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
      setLoading(false)
       
      if (error.response.data.error && error.response.data.error.length < 2) {
        setMsg(error.response.data.error[0].msg)
        setError(true)
        
        setTimeout(() => {
          setError(false)
          setAddBtn("Add")
        }, 3000)
        
        return
      }

      setMsg("Sorry, am unexpected error occurred, try reconnecting to the internet :(")
      setError(true)
      
      setTimeout(() => {
        setError(false)
        setAddBtn("Add")
      },3000)
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
            <div style={{display:"flex",justifyContent:"space-between", background:"rgb(220, 254, 255)", alignItems:"center", borderRadius:"8px"}}> 
              <input
                type="password"
                className="password st"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              <span style={{display:"flex",justifyContent:"center", gap:"0.8rem", margin:"0 0.8rem 0 0"}}>
                <i onClick={viewPasswordFunc} style={{cursor:"pointer",color:"black"}} class="bi bi-eye-slash" id="togglePassword"></i>
              </span>
            </div>
            {error &&
              <span style={{ color:"red", display: "flex", justifyContent: "center", alignContent: "center" }}>
                {msg}
              </span>
            }
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
            </div>
          </form>
      </div>
    </>
  )
}

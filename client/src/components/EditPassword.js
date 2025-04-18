import back_icon from "../img/arrow.svg";
import { Link } from "react-router-dom"

import API from "../utils/api"
import {useState, useEffect, useContext} from "react"
import Preloader from "./Preloader";
import { ViewPasswordContext } from "../contexts/ViewPasswordContext";
import { validateAddPassword } from "../utils/validation";

export default function EditPassword(props) {
  const [addBtn, setAddBtn] = useState("Save")
  const [username, setUsername] = useState(props.activeData.info[props.index].username)
  const [password, setPassword] = useState(props.activeData.info[props.index].password)
  const [site, setSite] = useState(props.activeData.site)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { msg, setMsg } = useState()

  const {viewPasswordFunc} = useContext(ViewPasswordContext)

  const editPassword = async (e) => {
    e.preventDefault()
    const id = props.activeData.info[props.index]._id

    const handle = validateAddPassword(useername, password, site, setError, setMsg)
    
    if (handle) {
      return
    }

    setAddBtn("Updating password...")
    setLoading(true)
    try {
      const response = await API.post(`/dashboard/edit/${id}`,
        {
          site,
          username,
          password
        },
        {
        withCredentials:true
        })
        
      const response2 = await API.get("/dashboard/get");
      const data = formattedData(response2.data.usersData.data)

      props.activeData.info[props.index].username = username
      props.activeData.info[props.index].password = password
      props.setFormattedData(data)
      props.setActiveData({site:props.activeData.site, info:props.activeData.info})

      setAddBtn("Saved!")
      setTimeout(() => {
        setAddBtn("Save")
      }, 2000)
      
      setLoading(false)
      props.setToggleModal("show")

    } catch (error) {
      console.log(error)
      setError(true)
      if (error.response.data.error && error.response.data.error.length < 2) {
        setMsg(error.response.data.error[0].msg)
        
        setTimeout(() => {
          setLoading(false)
          setError(false)
        }, 3000)
        
        return
      }

      setMsg("Sorry, am unexpected error occurred, try reconnecting to the internet :(")
      
      setTimeout(() => {
        setLoading(false)
        setError(false)
      },3000)
    }
  }

  const formattedData = (data) => Object.values(
    data.reduce((acc, { site, username, password,_id}) => {
        if (!acc[site]) {
            acc[site] = { site, info: [] };
        }
        acc[site].info.push({ username, password,_id});
        return acc;
    }, {})
  );
  
  return (
    <>
      {loading && <Preloader/>}
      <div className="back_ico top" onClick={() => props.setToggleModal("show")}>
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="figure add_password">
        <h2>Edit Password</h2>
        <form className="form">
            <label for="add_s">Site</label>
            <input id="add_s" type="text" className="add_s st" 
              onChange={(e) => setSite(e.target.value)}
              value={site}
              disabled
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
              }}
          >
            {error &&
              <span style={{ color:"red", display: "flex", justifyContent: "center", alignContent: "center" }}>
                {msg}
              </span>
            }
            <button className="save_p proceed"
              onClick={editPassword}>{addBtn}</button>
            </div>
          </form>
      </div>
    </>
  )
}

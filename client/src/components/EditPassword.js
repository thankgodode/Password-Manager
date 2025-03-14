import back_icon from "../img/arrow.svg";
import { Link } from "react-router-dom"

import API from "../utils/api"
import {useState, useEffect} from "react"
import Preloader from "./Preloader";


export default function EditPassword(props) {
  const [addBtn, setAddBtn] = useState("Edit")
  const [username, setUsername] = useState(props.activeData.info[props.index].username)
  const [password, setPassword] = useState(props.activeData.info[props.index].password)
  const [site, setSite] = useState(props.activeData.site)
  const [loading, setLoading] = useState(false)

  const editPassword = async (e) => {
    const id = props.activeData.info[props.index]._id

    e.preventDefault()

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

      setAddBtn("Saved!")
      setTimeout(() => {
        setAddBtn("Edit")
      }, 2000)
      
      props.setFormattedData(data)
      setLoading(false)
      props.setActiveData({site:props.activeData.site, info:props.activeData.info})
      
      props.setToggleModal("show")
    } catch (error) {
      console.log(error)
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
              onClick={editPassword}>{addBtn}</button>
            </div>
          </form>
      </div>
    </>
  )
}

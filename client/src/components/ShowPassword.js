import back_icon from "../img/arrow.svg";
import API from "../utils/api";
import Preloader from "./Preloader"
import {useState} from "react"

export default function ShowPassword(props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const deletePassword = async (e,id) => {
    setLoading(true)
    e.preventDefault()

    try {
      const response = await API.delete(`/dashboard/delete/${id}`)
      const response2 = await API.get("/dashboard/get")

      const filtered = props.activeData.info.filter((el, i) => el._id !== id)
      const data = formatDataFunc(response2.data.usersData.data)
      
      props.setFormattedData(data)

      if (!response2.data.usersData.data || response2.data.usersData.data.length < 1) {
        props.formattedData("empty")
      }
      
      if (filtered.length < 1) {
        props.setToggleModal("saved")
        setLoading(false)
        return
      }
      
      props.setActiveData({ site: props.activeData.site, info: filtered })

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
      alert("Something went wrong, try checking your internet connection :(")
    }
  }

  const formatDataFunc = (data) => Object.values(
    data.reduce((acc, { site, username, password,_id}) => {
        if (!acc[site]) {
            acc[site] = { site, info: [] };
        }
        acc[site].info.push({ username, password,_id});
        return acc;
    }, {})
  );

  const edit = (e, i) => {
    e.preventDefault()

    props.setIndex(i)
    props.setToggleModal("edit")
  }

  return (
    <>
      {loading && <Preloader />}
      <div className="back_ico" onClick={() => props.setToggleModal("saved")}>
        <img src={back_icon} alt="Back icon" />
      </div>
      <h1 style={{textAlign:"center", margin:"2.5rem 0 1.5rem 0"}}>{props.activeData.site.split(".")[0]}</h1>
      <div className="group" style={{ overflowY: "scroll", height:"480px"}} >
        <div className="title">
          {props.activeData.info.map((el, i) => {
            return <>
            <form className="form show_password">
              <label>Username</label>
              <input
                type="text"
                className="username st"
                value={el.username}
                disabled
              />
              <label>Password</label>
              <input
                type="password"
                className="password st"
                value={el.password}
                disabled
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  gap: "0.6rem",
                }}
              >
                <button className="edit proceed" onClick={(e) => edit(e,i)}>Edit</button>
                <button className="close cancel" onClick={(e)=> deletePassword(e,el._id)}>Delete</button>
              </div>
              {error && <span style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>Sorry, an unexpected error occured :(</span>}
            </form>
            </>
          })}
        </div>
      </div>
    </>
  );
}

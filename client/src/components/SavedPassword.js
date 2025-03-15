import back_icon from "../img/arrow.svg";
import search_icon from "../img/search.svg";

import API from "../utils/api"

import {useState, useEffect} from "react"
import ShowPassword from "./ShowPassword";
import EditPassword from "./EditPassword";

export default function SavedPassword(props) {
  const [formattedData, setFormattedData] = useState("")
  const [activeData, setActiveData] = useState("")
  const [toggleModal, setToggleModal] = useState("saved")
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState()
  const [error, setError] = useState(false)
  const [filterData,setFilterData] = useState("")

  useEffect(() => {
    const getPasswords = async() => {
      try {
        const response = await API.get("/dashboard/get");
        console.log(response)
        
        if (!response.data.usersData || response.data.usersData.data.length < 1) {
          setFormattedData("empty")
          setLoading(false)
          return
        }
        
        const data = formatDataFunc(response.data.usersData.data)
        console.log("Data: ", data)

        setFormattedData(data)
        setFilterData(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setError(true)
      }
    }

    getPasswords()
  }, [])

  const showData = (el) => {
    setToggleModal("show")
    setActiveData(el)
  }

  const search = (e) => {
    const searchTerm = e.target.value

    const filtered = filterData.filter((el, i) => el.site.toLowerCase().includes(searchTerm.toLowerCase())) 
    setFormattedData(filtered)
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


  return (
    <>
      {toggleModal == "show" &&
        <ShowPassword
          index={index}
          setIndex={setIndex}
          activeData={activeData}
          setActiveData={setActiveData}
          setToggleModal={setToggleModal}
          formattedData={formattedData}
          setFormattedData={setFormattedData} />
      }
      {toggleModal == "edit" &&
        <EditPassword
          activeData={activeData}
          index={index}
          setToggleModal={setToggleModal}
          setActiveData={setActiveData}
          setFormattedData={setFormattedData} />
      }
      {toggleModal ==="saved" &&
        <>
          <div className="back_ico top" onClick={() => props.setToggleModal("dashboard")}>
            <img src={back_icon} alt="Back icon" />
          </div>
          <div className="search">
          <input type="text" placeholder="Search here" className="v" onChange={(e) => search(e)}/>
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
              cursor: "pointer",
              fontSize: "2rem",
              borderRadius:"5px"
              
            }}
            onClick={() => props.setToggleModal("add")}
          >
            +
          </button>
          {loading &&
            <span style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              Loading...
            </span>
          }

          {error && <span style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
          }}>
            Sorry, an unexpected error occured, try checking your internet connection :(
          </span>
          }

          {formattedData == "empty" ? "There is no saved password here :(" : ""}
          {typeof formattedData =="object" ? 
            formattedData.map((el, i) =>
              <div onClick={() => showData(el)} key={i}>
                <h3>{el.site.split(".")[0]}</h3>
              </div>
            )
          :""}  
        </div>
      </>
      }
    </>
  );
}

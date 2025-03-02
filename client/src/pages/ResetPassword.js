import { Outlet, Link } from "react-router-dom";
import back_icon from "../img/arrow.svg";
import API from "../utils/api";
import { useState, useContext} from "react";
import Preloader from "../components/Preloader";
import UserInfoContext from "../contexts/UserInfoContext";


export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("")
  const [msg,setMsg] = useState("")

  const {userId} = useContext(UserInfoContext)


  const updatePassword = async (e, id) => {
    
    e.preventDefault()

    setIsLoading(true)

    if (password.length < 1 || confirmPassword.length < 1) {
      setIsLoading(false)
      setMsg("Passwords do not match :)")

      setTimeout(() => {
        setMsg("")
      },3000)
      return
    }

    if (password !== confirmPassword) {
      setIsLoading(false)
      setMsg("Passwords do not match :)")

      setTimeout(() => {
        setMsg("")
      },3000)
      return
    }

    try {
      const request = await API.post(`/forgot-password/reset-password/${id}`,
        {
          password: password
        },
        {withCredentials:true}
      )
      console.log(request)
      setIsLoading(false)
    
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } 
  }

  return (
    <>
      {isLoading && <Preloader/>}
      <div className="wrap">
        <Link to="/forgot_password">
          <div className="back_ico top">
            <img src={back_icon} alt="Back icon" />
          </div>
        </Link>
        <div className="figure verify_password">
          <div class="title">
            <h1>Reset Password</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="line large"></span>
              <span className="line small"></span>
            </div>
          </div>
          <form className="form">
            <input
              type="password"
              className="new_password st"
              placeholder="Enter new password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <input
              type="password"
              className="new_password st"
              placeholder="Confirm new password"
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
            {msg && <strong>{msg}</strong>}
            <button className="reset_btn st"
              onClick={(e)=> updatePassword(e,userId)}>Reset</button>
          </form>
        </div>
      </div>
    </>
  );
}

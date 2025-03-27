import { useContext } from "react";
import { ViewPasswordContext } from "../contexts/ViewPasswordContext";

export default function FormComponent(props) {

  const {viewPasswordFormFunc} = useContext(ViewPasswordContext)

    const showPassword = (e) => {
        const ico = document.querySelector(".bi")
        const text = document.querySelector(".password")

        const t = text.getAttribute('type') === 'password' ?
        text.setAttribute('type',"text") :
        text.setAttribute("type", 'password');
        
        ico.classList.toggle("bi-eye")
    
    }

    const copyPassword = (text, id) => {
        const el = document.getElementById(id+"pwd")
        
        el.classList.remove("bi-clipboard");
        el.classList.add("bi-clipboard-check");
            
        setTimeout(() => {
            el.classList.remove("bi-clipboard-check");
            el.classList.add("bi-clipboard");
            
            return
        }, 1500);


        navigator.clipboard.writeText(text)
    }

    const copyUsername = (text, id) => {
        const el = document.getElementById(id+"usn")
        
        el.classList.remove("bi-clipboard");
        el.classList.add("bi-clipboard-check");
            
        setTimeout(() => {
            el.classList.remove("bi-clipboard-check");
            el.classList.add("bi-clipboard");
            
            return
        }, 1500);

        navigator.clipboard.writeText(text)
    }

    return (
        <>
          <label>Username</label>
          <div style={{display:"flex",justifyContent:"space-between", background:"#e3d9ff", alignItems:"center", borderRadius:"8px"}}>
            <input
              type="text"
              className="username st"
              value={props.el.username}
              disabled
              />
              <span style={{ display: "flex", justifyContent: "center", gap: "0.8rem", margin: "0 0.8rem 0 0" }}>
                <i onClick={() => copyUsername(props.el.username, props.i)}  style={{cursor:"pointer"}} class="clipboard bi-clipboard" id={props.i+"usn"}></i>
              </span>
          </div>
              
          <label>Password</label>
          <div style={{display:"flex",justifyContent:"space-between", background:"#e3d9ff", alignItems:"center", borderRadius:"8px"}}> 
            <input
              type="password"
              className="password st"
              value={props.el.password}
              id={props.i+"pwd_text"}
              disabled
              />
            <span style={{display:"flex",justifyContent:"center", gap:"0.8rem", margin:"0 0.8rem 0 0"}}>
              <i onClick={(e)=> viewPasswordFormFunc(props.i)} style={{ cursor: "pointer" }} class="bi bi-eye-slash" id={props.i+"pwd_ico"}></i>
              <i onClick={()=> copyPassword(props.el.password, props.i)}  style={{cursor:"pointer"}} class="clipboard bi-clipboard" id={props.i+"pwd"}></i>
            </span>
          </div>
        </>
    )
}
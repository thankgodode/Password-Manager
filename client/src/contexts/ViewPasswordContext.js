import { createContext } from "react";

export const ViewPasswordContext = createContext()

export default function ViewPasswordProvider({children}) {
    const viewPasswordFunc = (e) => {
        const icon = document.querySelector(".bi")
        const text = document.querySelector(".password")

        const t = text.getAttribute('type') === 'password' ?
            text.setAttribute('type',"text") :
            text.setAttribute("type", 'password');

        icon.classList.toggle("bi-eye")

    }
   
    const viewPasswordFormFunc = (index) => {
        const icon = document.getElementById(index+"pwd_ico")
        const text = document.getElementById(index+"pwd_text")

        const t = text.getAttribute('type') === 'password' ?
            text.setAttribute('type',"text") :
            text.setAttribute("type", 'password');

        console.log(icon)
        icon.classList.toggle("bi-eye")

    }

    return (
        <ViewPasswordContext.Provider value={{viewPasswordFunc, viewPasswordFormFunc}}>
            {children}
        </ViewPasswordContext.Provider>
    )
}
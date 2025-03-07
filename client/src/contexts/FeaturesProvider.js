import { useState, useContext, createContext } from "react";

export const MyContext = createContext()

const FeaturesProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState("")
    const [error, setError] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [toggle, setToggle] = useState("signup")

    const [second,setSeconds] = useState("00")
    const [minute, setMinutes] = useState("03")
    const [timedout, setTimedout] = useState(true)
    const [stateInterval, setStateInterval] = useState("")
  
    
  const timeoutFunc = () => {
    var minutes = 3;
    var seconds = 0

    setTimedout(false)

    const interval = setInterval(() => {
      seconds--;
    
      setTimedout(false);
      if (minutes < 1 && seconds < 0) {
        minutes = "3";
        seconds = "0";          setMinutes(addZero(minutes));
        setSeconds(addZero(seconds));
        
        clearInterval(interval);
        setTimedout(true);
        return;
      } else if (minutes > 0 && seconds < 0) {
        seconds = 59;
        minutes--;
      }
      
      setMinutes(addZero(minutes));
      setSeconds(addZero(seconds));
    }, 1000);

    setStateInterval(interval)
  };
  
  const clearTimeout = () => {
    setSeconds("00")
    setMinutes("03")
    clearInterval(stateInterval)
  }

  function addZero(num) {
      return num < 10 ? "0" + num : num
  }

    return (
        <MyContext.Provider value={{
          timeoutFunc,
          timedout,
          minute,
          setMinutes,
          second,
          setSeconds,
          email,
          setEmail,
          toggle,
          setToggle,
          msg,
          setMsg,
          error,
          setError,
          password,
          setPassword,
          isLoading,
          setIsLoading,
          clearTimeout,
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default FeaturesProvider
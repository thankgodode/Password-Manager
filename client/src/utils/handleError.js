const handleSignupError = (err, setError, setMsg,setIsLoading) => {
    if (!err.response || typeof err.response.data.msg !== "string" || !err.response) {
        setError(true)
        setMsg("Please check your internet connection and refresh the page :)")
        setIsLoading(false)

        setTimeout(() => {
            setMsg("")
        }, 3000)
        
        return true
    }

    if (err.response.data.error) {
        setError(true)
        setMsg(err.response.data.msg)
        setIsLoading(false)

        setTimeout(() => {
            setError(false)
        }, 3000)
        
        return true
    }   
}

const handleLoginError = (err, setError,setMsg) => {
    if (!err.response || typeof err.response.data.msg !=="string" || !err.response.data) {
        setMsg("Please check your internet connection and refresh the page :)")

        setTimeout(() => {
            setMsg("")
        }, 3000)

        return true
    }

    setMsg(err.response.data.msg)

    setTimeout(() => {
        setError(false)
    }, 3000)
      
}

module.exports = {handleSignupError, handleLoginError}
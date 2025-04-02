const validateSignup = (firstName, lastName, password,email,setError,setMsg) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s]).+$/;
    
    if (!firstName || !lastName || !password || !email) {
        setError(true)
        setMsg("Input fields cannot be left empty")

        setTimeout(() => {
            setError(false)
        }, 3000)
        
        return true
    }

    if (firstName.length < 3 || lastName.length < 3) {
        setError(true)
        setMsg("First/last name cannot be less than 5 characters")

        setTimeout(() => {
            setError(false)
        }, 3000)
        
        return true
    }

    if (password.length < 8) {
        setError(true)
        setMsg("Password length must be greater than or equal to 8")
        setTimeout(() => {
            setMsg("")
        }, 3000)

        return true
    }

    if (!regex.test(password)) {
        setError(true)
        setMsg("Password must contain atleast an uppercase, lowercase and a special character")
        setTimeout(() => {
            setMsg("")
        }, 3000)

        return true
    }
}

const validateLogin = (loginEmail,loginPassword,setError,setMsg) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s]).+$/;

    if (!loginEmail || !loginPassword) {
        setError(true)
        setMsg("Input field(s) cannot be left blank :)")

        setTimeout(() => {
            setError(false)
        }, 3000)
        
        return true
    }

    //Front-end validation
    if (loginPassword.length < 8) {
        setError(true)
        setMsg("Password length must be greater than or equal to 8")
        setTimeout(() => {
            setMsg("")
        }, 3000)

        return true
    }

    if (!regex.test(loginPassword)) {
        setError(true)
        setMsg("Password must contain atleast an uppercase, lowercase and a special character")
        setTimeout(() => {
            setMsg("")
        }, 3000)

        return true
    }

}

const validateAddPassword = (username,password,site,setError,setMsg) => {
    if (!username || !password || !site) {
      setError(true)
      setMsg("Input fields cannot be left blank :(")

      setTimeout(() => {
        setError(false)
      },3000)
      
      return true
    }

    if (password.length < 8) {
      setError(true)
      setMsg("Password cannot be less than 8 characters")

      setTimeout(() => {
        setError(false)
      }, 3000)
        
      return true
    }
}

module.exports = {validateLogin,validateSignup, validateAddPassword}
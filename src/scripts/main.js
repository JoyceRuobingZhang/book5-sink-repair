// import { SinkRepair } from "./SinkRepair.js"


// const mainContainer = document.querySelector("#container")

// const render = () => {
//     mainContainer.innerHTML = SinkRepair()
// }

// render()


import { fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}
render()

// listen to the notification from the sendRequest function in the dataAccess.js
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)


/* Requirements:

They want 📒a form where a person can enter in a description of 1️⃣the job, 2️⃣the address where the work needs to be done, 
their 3️⃣spending limit for the job, 4️⃣and a date the work should be completed by.

Once they are done with a job, they want a way to...

💠Track who worked on the service request.
💠Once Maude and/or Merle are recorded to have finished the job, they want the UI to reflect that the job is complete.
💠If they don't have time to work on a particular request, they want the ability to delete it from the list.
 */
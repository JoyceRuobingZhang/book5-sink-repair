import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"

// explorer chapter
// Creating New State for Completion
export const Requests = () => {
        const requests = getRequests()
        const plumbers = getPlumbers()

        let html = requests.map(request => {
                    if (request.completed) {
                        return `<ul class="completed">
                        <li>🛠${request.description}</li>
                        <button class="request__delete" id="request--${request.id}">Delete</button>
                        </ul>`
                    } else {
                        return `<ul class="incompleted">
                        <li>🛠${request.description}</li>

                        <div class="request-state">
                        <select class="plumber-options" id="plumbers">
                        <option>Choose</option>
                        ${
                            plumbers.map(
                                plumber => {
                                    /* 在每个 request id 下 都添加 所有plumber 选项。
                                      （即在每个 request 里 loop through plumbers, 添加所有plumber 选项）
                                    */
                                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                                }
                            ).join("")
                        }
                        </select>

                        <button class="request__delete" id="request--${request.id}">Delete</button>
                        </div>
                        </ul>`
            }
        }).join("")

        return html 
    }
            

// 🟡加 choose plumber 选项
    //     let html = `
    //     <ul>
    //         ${
    //             requests.map(request => {
    //                 return `
    //                 <li>🛠${request.description}</li>

    //                 <select class="plumbers" id="plumbers">
    //                     <option>Choose</option>
    //                     ${
    //                         plumbers.map(
    //                             plumber => {
    //                                 /* 在每个 request id 下 都添加 所有plumber 选项。
    //                                   （即在每个 request 里 loop through plumbers, 添加所有plumber 选项）
    //                                 */
    //                                 return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
    //                             }
    //                         ).join("")
    //                     }
    //                 </select>

    //                 <button class="request__delete" id="request--${request.id}">Delete</button>
    //                 `}).join("")
    //         }
    //     </ul>
    // `


const mainContainer = document.querySelector("#container")
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const requestId = click.target.id.split("--")[1]
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        // click the <select> element to choose a plumber
        if (event.target.id === "plumbers") {
            // const [requestId, plumberId] = event.target.value.split("--")
            const userRequestId = event.target.value.split("--")[0]
            const userPlumberId = event.target.value.split("--")[1]

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: userRequestId,
                plumberId: userPlumberId,
                date_created: Date(Date.now())
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)

        }
    }
)
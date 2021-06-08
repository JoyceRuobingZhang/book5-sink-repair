import { getRequests, deleteRequest } from "./dataAccess.js"


export const Requests = () => {
        const requests = getRequests()

        let html = `
        <ul>
            ${
                requests.map(request => {
                    return `<li>${request.description}</li>
                    <button class="request__delete" id="request--${request.id}">Delete</button>`
                }).join("")
            }
        </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const requestId = click.target.id.split("--")[1]
        deleteRequest(parseInt(requestId))
    }
})
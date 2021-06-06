const applicationState = {

}

// copied code
const API = "http://localhost:8088"

export const fetchRequests = () => {
    /* it’s pretty common to 🟡🟡return the asynchronous call anyways 
    so that if something does need to know when a request has finished, 
    it can await that (because the Promise is returned out of the functions)*/
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

// The POST method on any HTTP request means "Hey API!! I want you to create something new!"
const mainContainer = document.querySelector("#container")
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
                // 🟡🟡🟡Remember that every time state changes, you have to generate new HTML representations of the state.  
        })
}

// added code
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request }))
}
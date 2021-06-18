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

let plumbers = []
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (allPlumbers) => {
                // Store the external state in application state
                plumbers = allPlumbers
            }
        )
}

export const fetchCompletions = () => {
    /* it’s pretty common to 🟡🟡return the asynchronous call anyways 
    so that if something does need to know when a request has finished, 
    it can await that (because the Promise is returned out of the functions)*/
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (allCompletions) => {
                // Store the external state in application state
                applicationState.completions = allCompletions
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

export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
                // 🟡🟡🟡Remember that every time state changes, you have to generate new HTML representations of the state.  
        })
}

// HTTP DELETE method
// When you use the DELETE method on an HTTP request, you must identify a single resource.
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}



// added code
export const getPlumbers = () => {
    return plumbers.map(plumber => ({...plumber }))
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion }))
}

/* 🟡🟡🟡explorer chapter 
Modify the getRequests() method in the data access module 
to ❗️return an array of service request objects that are sorted by their completion status❗️. 
Incomplete ones should be displayed first. 
As soon as a service request is completed, it should be marked with a different color and sorted to the bottom of the list.
*/
export const getRequests = () => {
    let requestsArr = applicationState.requests.map(request => ({...request }))
    for (const request of requestsArr) {
        const completions = getCompletions()
            /* The some() method tests whether at least one element in the array passes the test implemented by 
            the provided function. It returns a Boolean value.*/
        let completionCheck = completions.some(completion => {
            return request.id == completion.requestId
        })
        if (completionCheck) {
            request.completed = true
        } else {
            request.completed = false
        }
    }
    requestsArr.sort(function(x, y) {
        return (x.completed === y.completed) ? 0 : x.completed ? 1 : -1
    })
    return requestsArr
}
// export const SinkRepair = () => {
//     return `
//     <h1>Maude and Merle's Sink Repair</h1>
//     <section class="serviceForm">
//     </section>

//     <section class="serviceRequests">
//         <h2>Service Requests</h2>

//     </section>
//     `
// }

import { Requests } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"

export const SinkRepair = () => {
    return `
        <div class="header">
            <image src="./image/logo.png" alt="logo" width="100px">
            <h1>Maude and Merle's Sink Repair</h1>
        </div>
        <section class="serviceForm">
            <h2>Service Form</h2>
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            ${Requests()}
        </section>
    `
}
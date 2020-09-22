import { getMoods, useMoods } from "../moods/MoodProvider.js"
let allMoods
const eventHub = document.querySelector("#event-hub")
export const MoodFilter = () => {
    //make look like moodSelect
       return getMoods()
            .then(useMoods)
            .then(moods =>{
                allMoods = moods
                console.log(allMoods)
                return allMoods
            }).then(() => {
                // debugger
                console.log("inside last .then", allMoods)
                let html = `
                <fieldset class="fieldset">
                <legend>Filter Journal Entries by Mood</legend>
                ${
                    allMoods.map(
                        (mood) => {
                            return `<input type="radio" name="moodFilter" value="${ mood.id }"/>
                            <label for="moodFilter--happy">${ mood.label }</label>
                            `
                        }
                        ).join("")
                    }
                    </fieldset>
                    ` 
                console.log(html) 
                return html         
            })   
}
// eventHub.addEventListener("change", e => {
//     if (e.target.name === "moodFilter") {
//         const customEvent = new CustomEvent("moodChosen", {
//             detail: {
//                 moodId = e.target.value
//             }
//         })
//         eventHub.dispatchEvent(customEvent)
//     }
// })
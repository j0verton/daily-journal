import { getMoods, useMoods } from "../moods/MoodProvider.js"
let allMoods
const eventHub = document.querySelector("#event-hub")
export const MoodFilter = () => {
    //make look like moodSelect
        getMoods()
            .then(useMoods)
            .then(moods =>{
                allMoods = moods
                console.log(allMoods)
            }).then(() => {
                // debugger
                console.log(allMoods)
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
eventHub.addEventListener("change", e => {
    if (e.target.name === "moodFilter") {

    }
})
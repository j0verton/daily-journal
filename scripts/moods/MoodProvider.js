import { moodSelect } from "../form/JournalForm.js"

let moods = []

export const useMoods = () => {
    return moods.slice()
}

export const getMoods = () => {
    return fetch("http://localhost:8088/moods") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(moodList => {
            moods = moodList
        })
}

export const saveMood = mood => {
    const moodEntry = {
        label: mood
    }
    return fetch('http://localhost:8088/moods', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(moodEntry)
    }).then(moodSelect)
}

document.addEventListener("click", clickEvent => {
    let moodBtn = document.getElementById("newMood")
    if (event.target.id === "newMood") {
        if (moodBtn.textContent === "enter a new mood"){
            document.getElementById("moodField").innerHTML = 
            `<label for="mood">Mood for the Day</label>
            <input type="text" name="mood" id="mood" maxlength="10">
            <button type="button" id="newMood">save mood</button>`
        } else if (moodBtn.textContent === "save mood" && document.getElementById("mood").value){
            let newMood = document.getElementById("mood").value
            console.log(newMood)
            saveMood(newMood)
        } else if (moodBtn.textContent === "save mood" && !document.getElementById("mood").value) {
            moodSelect()
        }
    }

})
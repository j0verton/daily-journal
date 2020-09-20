
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
    return fetch('http://localhost:8088/moods', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mood)
    })
}

document.addEventListener("click", clickEvent => {
    let moodBtn = document.getElementById("newMood")
    if (event.target.id === "newMood") {
        if (moodBtn.textContent === "enter a new mood"){
            moodBtn.textContent = "save mood"

        }
    }

})
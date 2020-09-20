
import { moodSelect } from "./form/JournalForm.js"
import { JournalEntryComponent } from "./JournalEntry.js"
import { saveMood } from "./moods/MoodProvider.js"
const eventHub = document.querySelector("#event-hub")

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}

export const getEntries = () => {
    return fetch("http://localhost:8088/entries?_expand=mood") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(entries => {
            let allEntries = entries.map(entry => {
                let HTMLentry = JournalEntryComponent(entry)
                HTMLentry += `<button type="button" id="deleteBtn--${entry.id}">delete entry</button>`
                let allEntries = ''
                allEntries += HTMLentry
                return allEntries
            })
            entryLog.innerHTML = allEntries.join('')
        })
}
export const saveJournalEntry  = entry => {
    console.log("note inside save", entry)
    return fetch('http://localhost:8088/entries', { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    .then(getEntries)
    .then(dispatchStateChangeEvent)
}
export const deleteEntry = entryId => {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
        method: "DELETE"
    })
        .then(getEntries)
        .then(dispatchStateChangeEvent)
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "record-entry"){
        clickEvent.preventDefault()
    // 

    // 
        // Make a new object representation of a note
        const newEntry = {
            date: `${document.getElementById("journalDate").value}`,
            concept: `${document.getElementById("concepts").value}`,
            entry: `${document.getElementById("entry").value}`,
            moodId: `${document.getElementById("mood").value}`
        }
        console.log(newEntry)
        if(newEntry.date && newEntry.concept && newEntry.entry && newEntry.moodId){
            
            let moodIdNumber = parseInt(newEntry.moodId)
            if(Number.isInteger(moodIdNumber)){
                console.log("isInt")
                // Change API state and application state
                saveJournalEntry (newEntry)
            } else { 
                let newMood = document.getElementById("mood").value
                debugger
                //moodselect isnt running before the .then on line 75
                Promise.allSettled([saveMood(newMood), moodSelect()])
                .then(()=>{
                    let newMoodContainer = document.querySelector("#mood")
                    let moodArray = newMoodContainer.querySelectorAll("option")
                    let newMood = moodArray.find(element => {
                        return element.textContent === newMood
                    })
                    newEntry.moodId = newMood.value
                    saveJournalEntry (newEntry)
                })
            }
        } else { alert("Please fill out every field before saving your entry!")}
    }
})

const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}

eventHub.addEventListener("click", clickEvent => { 
    if (clickEvent.target.id.startsWith("deleteBtn--")){
        const [prefix, entryId] = clickEvent.target.id.split("--")
        deleteEntry(entryId)
    }
})
    
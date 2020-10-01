
import { moodSelect } from "./form/JournalForm.js"
import { JournalEntryComponent } from "./JournalEntry.js"
import { saveMood } from "./moods/MoodProvider.js"
import { findTag, saveEntryTag, saveTag } from "./tags/TagProvider.js"
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
        .then(response => response.json())
}
        
export const addEntriestoDOM = entryArray => {        
    let allEntries = entryArray.map(entry => {
        let HTMLentry = JournalEntryComponent(entry)
        HTMLentry += `<button type="button" id="deleteBtn--${entry.id}">delete entry</button>`
        let allEntries = ''
        allEntries += HTMLentry
        return allEntries
    })
    entryLog.innerHTML = allEntries.join('')
}
export const saveJournalEntry  = entry => {
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
        // Make a new object representation of a note
        const newEntry = {
            date: `${document.getElementById("journalDate").value}`,
            concept: `${document.getElementById("concepts").value}`,
            entry: `${document.getElementById("entry").value}`,
            moodId: `${document.getElementById("mood").value}`
        }
        if(newEntry.date && newEntry.concept && newEntry.entry && newEntry.moodId){
            
            let moodIdNumber = parseInt(newEntry.moodId)
            if(Number.isInteger(moodIdNumber)){
                // Change API state and application state
                saveJournalEntry (newEntry)
            } else { 
                let newMood = document.getElementById("mood").value
                saveMood(newMood)
                .then(moodObj=>{
                    let newMood = moodObj.id
                    newEntry.moodId = newMood
                    saveJournalEntry (newEntry)
                    moodSelect()
                })
            }
        } else { alert("Please fill out every field before saving your entry!")}
    } 
})

const dispatchStateChangeEvent = entry => {
    console.log(entry)
    let newEntry = entry.pop()
    console.log(newEntry)
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged", {
        detail: {
            newId: newEntry.id
        }
    }))
}

eventHub.addEventListener("click", clickEvent => { 
    if (clickEvent.target.id.startsWith("deleteBtn--")){
        const [prefix, entryId] = clickEvent.target.id.split("--")
        deleteEntry(entryId)
    }
})
    
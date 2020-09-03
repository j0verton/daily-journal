
import { JournalEntryComponent } from "./JournalEntry.js"
const eventHub = document.querySelector("#event-hub")

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}

export const getEntries = () => {
    return fetch("http://localhost:8088/entries") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(entries => {
            let allEntries = entries.map(entry => {
                let HTMLentry = JournalEntryComponent(entry)
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
    .then(getEntries())
    .then(dispatchStateChangeEvent())
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "record-entry") {
        // Make a new object representation of a note
        const newEntry = {
            date: `${document.getElementById("journalDate").value}`,
            concept: `${document.getElementById("concepts").value}`,
            entry: `${document.getElementById("entry").value}`,
            mood: `${document.getElementById("mood").value}`
        }
        console.log(newEntry)
        // Change API state and application state
        saveJournalEntry (newEntry)
    }
})

const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}
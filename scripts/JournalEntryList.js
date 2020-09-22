/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { useJournalEntries, getEntries, addEntriestoDOM } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"
import { handleChange } from "./form/JournalForm.js"

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector("#entryLog")
const eventHub = document.querySelector("#event-hub")

export const EntryListComponent = () => {
    // Use the journal entry data from the data provider component
    getEntries().then(entries => {
        addEntriestoDOM(entries)
    })
}

eventHub.addEventListener("journalStateChanged", () => {
    EntryListComponent()
})

eventHub.addEventListener("moodChosen", event => {
    getEntries().then(entries => {
        console.log(entries)
        return entries.filter(entry => {
            return entry.moodId === parseInt(event.detail.moodId)
        })
    }).then(entryArray => {
        console.log(entryArray)
        addEntriestoDOM(entryArray)
    })
})
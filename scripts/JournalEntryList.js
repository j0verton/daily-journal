/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { useJournalEntries, getEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector("#entryLog")
const eventHub = document.querySelector("#event-hub")

export const EntryListComponent = () => {
    // Use the journal entry data from the data provider component
    const entries = getEntries()

    //refactored to remove the for...of in favor of .map
    // entries.map(entry => {
    //     let HTMLentry = JournalEntryComponent(entry)
    //    entryLog.innerHTML += HTMLentry;

    // })
    

}
eventHub.addEventListener("journalStateChanged", EntryListComponent())
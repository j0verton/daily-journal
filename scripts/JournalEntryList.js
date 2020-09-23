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
    return getEntries().then(entries => {
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

//this is the thing I kept doing that doesn't work, fixed above

// eventHub.addEventListener("moodChosen", event => {
//     let entryArray = getEntries().then(entries => {
//         console.log(entries)
//         return entries.filter(entry => {
//             return entry.moodId === event.detail.moodId
//         })
//     })
//     console.log(entryArray)
//     addEntriestoDOM(entryArray)
//     })

// findTag(tag)  // tag variable will have a string value
//     .then(matches => {  // `matches` variable value will be array of matching objects
//         let matchingTag = null

//         if (matches.length > 0) {
//             matchingTag = matches[0].id
//         }

//         if (matchingTag === null) {
//             // Tag doesn't exist. Create it then assign it to entry.
//             saveTag(tag)
//                 .then(new_tag => {
//                     saveEntryTag(entry.id, new_tag.id)
//                 })
//         }
//         else {
//             // Tag does exist. Assign it to entry.
//             saveEntryTag(entry.id, matchingTag)
//         }
//     })


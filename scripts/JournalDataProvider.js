/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
const journal = [
    // {
    //     id: 1,
    //     date: "08/23/2020",
    //     concept: "HTML & CSS",
    //     entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
    //     mood: "Excited"
    // },
    // {
    //     id: 2,
    //     date: "08/24/2020",
    //     concept: "Complex Flexbox",
    //     entry: "I tried to have an element in my Flexbox layout also be another Flexbox layout.",
    //     mood: "chill"
    // },
    // {
    //     id: 3,
    //     date: "08/25/2020",
    //     concept: "Git/Terminal",
    //     entry: "We started working on using git repositories.",
    //     mood: "Gung-Ho"
    // },
    // {
    //     id: 4,
    //     date: "08/26/2020",
    //     concept: "Git/Terminal",
    //     entry: "We started work on a group project to get practice working with github.  It's confusing but fun!",
    //     mood: "Sad"
    // },
    // {
    //     id: 5,
    //     date: "08/27/2020",
    //     concept: "JavaScript",
    //     entry: "We built a series of JavaScript modules that tracked when patients were diagnosed and whether they were infected.  The modules had and automated test.  I got so into it that I made two eggs explode (through negligence) and had to clean the kitchen walls and floors before i could finish the challenge. true story.",
    //     mood: "frantic"
    // }
]

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}

export const getEntries = () => {
    return fetch("http://localhost:8088/entries") // Fetch from the API
        .then()  // Parse as JSON
        .then(entries => {
            console.log(entries)
            entries.map(entry => {
                let HTMLentry = JournalEntryComponent(entry)
                entryLog.innerHTML += HTMLentry;
        
            })
        })
}
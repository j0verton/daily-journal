/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
const journal = [
    {
        id: 1,
        date: "08/24/2020",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "Excited"
    },
    {
        id: 2,
        date: "08/26/2020",
        concept: "Complex Flexbox",
        entry: "I tried to have an element in my Flexbox layout also be another Flexbox layout.",
        mood: "chill"
    },
    {
        id: 3,
        date: "08/27/2020",
        concept: "Git/Terminal",
        entry: "We started working on using git repositories.",
        mood: "Gung-Ho"
    },
    {
        id: 4,
        date: "08/28/2020",
        concept: "Git/Terminal",
        entry: "We started work on a group project to get practice working with github.  It's confusing but fun!",
        mood: "Sad"
    }
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
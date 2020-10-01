/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h2>${entry.concept}</h2>
            mood: ${entry.mood.label}
            ${entry.entry}
            ${entry.date}
            <p class="tags"></p>
        </section>
    `
}
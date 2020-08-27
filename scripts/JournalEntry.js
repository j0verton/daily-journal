/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h2>${entry.concept}</h2>
            ${entry.entry}
            ${entry.date}
        </section>
    `
}
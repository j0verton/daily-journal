import { getMoods, useMoods } from "../moods/MoodProvider.js"

export const JournalFormComponent = () => {
    let allMoods
    getMoods()
    .then(useMoods)
    .then(moods => {
        allMoods = moods
    }).then(() => {
        const form = `
            <h2>Daily Journal</h2>
            <form action="">
                <fieldset>
                    <label for="journalDate">Date of Entry</label>
                    <input type="date" name="journalDate" id="journalDate">
                </fieldset>
                <fieldset id="concept-field">
                    <label for="concepts">Concepts covered</label>
                    <input type="text" name="concepts" id="concepts" maxlength="10">
                </fieldset> 
                <fieldset>
                    <label for="entry">Journal Entry</label>
                    <textarea name="message" rows="10" cols="30" id="entry"></textarea>
                </fieldset>
                <fieldset>
                    <label for="mood">Mood for the Day</label>
                    <select name="mood" id="mood">
                    ${
                        allMoods.map(
                            (mood) => {
                                return `<option value="${ mood.id }">${ mood.label }</option>`
                            }
                        ).join("")
                    }
                    </select>
                    <button type="button" id="newMood">enter a new mood</button>
                </fieldset>
                <fieldset>
                    <button type="submit" id="record-entry">record entry</button>
                </fieldset>
            </form>
        `
        document.getElementById("form").innerHTML += form
    })
}



export const handleChange = ()=> {
    let conceptAlertTarget = document.getElementById("concept-field")
    let conceptEntry = document.getElementById("concepts").value;
    if (conceptEntry.length >= 9) 
    {
        conceptAlertTarget.innerHTML += '<div>only 10 characters allowed</div>';
    }
}

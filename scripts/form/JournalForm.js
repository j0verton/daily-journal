export const JournalFormComponent = () => {
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
                <option value="excited">excited</option>
                <option value="gung-ho">gung-ho</option>s
                <option value="pumped">pumped</option>
                <option value="bleary">bleary</option>
                <option value="sad">sad</option>
                <option value="overwhelmed">overwhelmed</option>
                <option value="good to go">good to go</option>
                <option value="chill">chill</option>
                <option value="bleh">bleh</option>
                <option value="blarg">blarg</option>
                <option value="need coffee">need coffee</option>
                <option value="frustrated">frustrated</option>
                <option value="calm">calm</option>
                <option value="grumpy">grumpy</option>
                <option value="stresed">stresed</option>
                <option value="frantic">frantic</option>
            </select>
        </fieldset>
        <fieldset>
            <button type="button" id="record-entry">record entry</button>
        </fieldset>
    </form>
    `
document.getElementById("form").innerHTML += form
}



export const handleChange = ()=> {
    let conceptAlertTarget = document.getElementById("concept-field")
    let conceptEntry = document.getElementById("concepts").value;
    if (conceptEntry.length >= 9) 
    {
        conceptAlertTarget.innerHTML += '<div>only 10 characters allowed</div>';
    }
}

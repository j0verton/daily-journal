export const findTag = (subject) => {
    return fetch(`http://localhost:8088/tags?subject=${subject}`)
        .then(response => response.json())
}



export const saveTag = tag => {
    let tagObj = {
        subject: tag
    }
        return fetch('http://localhost:8088/tags', { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        })
}


export const saveEntryTag = (entryId, tagId) => {
    console.log(entryId)
    console.log(tagId)
    let EntryTagObj = {
        entryId: entryId,
        tagId: tagId
    }
    return fetch('http://localhost:8088/entrytags', { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(EntryTagObj)
    })
    .then(dispatchTagStateChangeEvent)
}


const dispatchTagStateChangeEvent = () => {}

/*
Add an input field in your journal form where you can enter a list of tags, separated by commas
 - "API,components,providers".

When the save button is clicked, split the string on the comma t
o produce an array of tag strings - ["API", "components", "providers"].

For each tag, check if there is already a tag object in your database with that subject.

 If there isn't, use a POST operation to create one. Capture the id of the newly created tag.

 If there is, get its id.

 Create your journal entry and capture the id of it once it is created.

 For each tag that was applied, create an entry in the entrytags collection. For this example, there would be three POST operations.

 Entry id and "API" tag id

 Entry id and "components" tag id

 Entry id and "providers" tag id

*/
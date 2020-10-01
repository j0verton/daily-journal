import { findTag, getTags, saveEntryTag, saveTag } from "./TagProvider.js"

const eventHub = document.querySelector("#event-hub")

eventHub.addEventListener("journalStateChanged", e => {
    console.log(e)
    let tagsString = document.getElementById("tags").value
    let tagArray = tagsString.split(",")
    console.log(tagArray)
    tagArray.forEach(tag => {
        findTag(tag)  // tag variable will have a string value
            .then(matches => {  // `matches` variable value will be array of matching objects
                let matchingTag = null
                if (matches.length > 0) {
                    matchingTag = matches[0].id
                }
                if (matchingTag === null) {
                    // Tag doesn't exist. Create it then assign it to entry.
                    saveTag(tag)
                        .then(response => response.json())
                        .then(new_tag => {
                            console.log(new_tag)
                            saveEntryTag(e.detail.newId, new_tag.id)
                        })
                }
                else {
                    // Tag does exist. Assign it to entry.
                    saveEntryTag(e.detail.newId, matchingTag)
                }
            })
    }) 
})


export const displayTags = () => {
    getTags()
        .then(tagArray => {
            tagArray.forEach(entryTag => {
                console.log(entryTag.tag.subject)
                const target = document.querySelector(`#entry--${entryTag.entryId}`)
                let htmlTarget = target.querySelector(".tags")
                if (!htmlTarget.textContent.includes(`${entryTag.tag.subject}`)){
                htmlTarget.innerHTML += '#' + entryTag.tag.subject
            }
            })
        })
}

//this section deals with the tags, tags are split up, findTag searches the tags in the db for each one 
//then they are added to both lists if they dont exist yet

// let tagsString = document.getElementById("tags").value
// let tagArray = tagsString.split(",")
// console.log(tagArray)
// tagArray.forEach(tag => {
//     findTag(tag)  // tag variable will have a string value
//         .then(matches => { 
//             console.log(newEntry) // `matches` variable value will be array of matching objects
//             let matchingTag = null
//             if (matches.length > 0) {
//                 matchingTag = matches[0].id
//             }
//             if (matchingTag === null) {
//                 // Tag doesn't exist. Create it then assign it to entry.
//                 saveTag(tag)
//                     .then(new_tag => {
//                         saveEntryTag(newEntry.id, new_tag.id)
//                     })
//             }
//             else {
//                 // Tag does exist. Assign it to entry.
//                 saveEntryTag(newEntry.id, matchingTag)
//             }
//         })
// }) 

/*
Add an input field in your journal form where you can enter a list of tags, separated by commas
 - "API,components,providers".

When the save button is clicked, split the string on the comma to produce an array of tag strings 
- ["API", "components", "providers"].

For each tag, check if there is already a tag object in your database with that subject.

 If there isn't, use a POST operation to create one. Capture the id of the newly created tag.

 If there is, get its id.

 Create your journal entry and capture the id of it once it is created.

 For each tag that was applied, create an entry in the entrytags collection. 
 For this example, there would be three POST operations.

 Entry id and "API" tag id

 Entry id and "components" tag id

 Entry id and "providers" tag id

*/
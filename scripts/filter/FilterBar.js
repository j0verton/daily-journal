import { MoodFilter } from "./MoodFilter.js"

/*
 You need to make a new HTML element with a class of
 `filters` in index.html
*/
const contentTarget = document.querySelector(".filters")

export const FilterBar = () => {
    console.log("filterbar")
    const render = () => {
        contentTarget.innerHTML = `
            ${filter}
        `
    }
    let filter
    MoodFilter(response => {
         filter = response
    }).then(render)
}
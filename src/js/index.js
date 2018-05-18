import data from '../static/all.json';

document.addEventListener("DOMContentLoaded", function() {
    if(document.readyState === "interactive" || document.readyState === "complete") {
        // list posts
        const container = document.querySelector('#container');
        container.innerHTML = `<ul>${data.map(element => {
            return `<li>${element.name}</li>`
        })}</ul>`;

    }
});

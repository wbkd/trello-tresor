import data from '../static/all.json';

document.addEventListener("DOMContentLoaded", function() {
    if(document.readyState === "interactive" || document.readyState === "complete") {
        // list posts
        const container = document.querySelector('#container');
        container.innerHTML = `<ul>${data.map(element => {
            if (element.attachments[0].previews.length > 0) {
                return `<li>${element.name} <img src="${element.attachments[0].previews[0].url}"></li>`;
            } else {
                return `<li>${element.name} </li>`;
            }
        })}</ul>`;

    }
});

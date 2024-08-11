let links = [
    // for testing
    {
        url: "https://drive.google.com",
        img: "imgs/drive.png",
        alt: "Google Drive"
    },
    {
        url: "https://drive.google.com",
        img: "imgs/drive.png",
        alt: "Google Drive"
    },
    {
        url: "https://drive.google.com",
        img: "imgs/drive.png",
        alt: "Google Drive"
    },
    {
        url: "https://drive.google.com",
        img: "imgs/drive.png",
        alt: "Google Drive"
    },
]

let linkElements = [];

function render(linkData, i) {
    let a = document.createElement("a");
    let img = document.createElement("img");
    let linkContainer = document.createElement("div");

    img.src = linkData.img;
    img.alt = linkData.alt;
    img.classList.add("link-icon");

    a.addEventListener("click", (e) => {
        removeLink(e.target.parentElement.parentElement.dataset.index);
    });
    a.appendChild(img);

    linkContainer.classList.add("link");
    linkContainer.appendChild(a);
    linkContainer.dataset.index = i;
    document.getElementsByClassName("link-bank")[0].appendChild(linkContainer);
    linkElements.push(linkContainer);
}

function removeLink(i) {
    if (links.length === 1) {
        alert("You must have at least one link!");
        return;
    }
    console.log(i)
    links.splice(i, 1);
    linkElements[i].remove();
    linkElements[i] = null;
    // linkElements = document.getElementsByClassName("link");
}

function addLink(data) {
    if (links.length >= 5) {
        alert("You can only have up to 5 links");
        return;
    }
    links.push(data);
    render(data, links.length - 1);
}

links.forEach((link,i) => {
    render(link, i);
});
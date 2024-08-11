let links = [
    {
        url: "https://drive.google.com",
        img: "imgs/drive.png",
        alt: "Google Drive"
    }
]

links.forEach(link => {
    let a = document.createElement("a");
    let img = document.createElement("img");
    img.src = link.img;
    img.alt = link.alt;
    a.href = link.url;
    a.appendChild(img);

    let linkContainer = document.createElement("div");
    linkContainer.classList.add("link");
    linkContainer.appendChild(a);
    
    document.getElementById("link-bank").appendChild(linkContainer);
});
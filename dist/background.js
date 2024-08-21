chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
            links: [
                {
                    url: "https://outlook.office.com/mail/",
                    img: "imgs/outlook.png",
                    alt: "Outlook"
                },
                {
                    url: "https://bca.schoology.com/home",
                    img: "imgs/schoology.webp",
                    alt: "Schoology"
                },
                {
                    url: "https://bcts.powerschool.com/public/",
                    img: "imgs/powerschool.png",
                    alt: "Powerschool"
                },
                {
                    url: "https://drive.google.com",
                    img: "imgs/drive.png",
                    alt: "Google Drive"
                },
                {
                    url: "https://www.github.com",
                    img: "imgs/github.png",
                    alt: "GitHub"
                },
            ]
        }, function () {
        console.log('Data is stored');
    });
});

var template = Handlebars.templates.sched;
const output = document.getElementById("sched");

const colors = [
    "#bfa3d9",
    "#cefaec",
    "#95b6ed",
    "#8ad195",
    "#CF9893",
    "#A288C8",
    "#EDDEA4",
    "#f0b4e0",
    "#8BAAAD",
    "#89f76d",
    "#8ad3e6",
    "#f5c99a",
    "#71A1FF",
    "#80C0A6",
    "#9fedbe",
    "#abe879",
    "#B97375",
    "#CEB1BE",
];

function isUsed(assignedColors, val) {
    for (let i = 0; i < assignedColors.length; i++) {
        if (assignedColors[i].val === val || (val.includes("Study Hall") && assignedColors[i].val.includes("Study Hall"))) {
            return assignedColors[i].color;
        }
    }
    return false;
}

function isDark(rgb) {
    let r = parseInt(rgb.substring(1, 3), 16);
    let g = parseInt(rgb.substring(3, 5), 16);
    let b = parseInt(rgb.substring(5, 7), 16);
    let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq < 128) ? "#fff" : "#000";
}

const contextInfo = await getContext();
output.innerHTML = template(contextInfo);

function parseSched(scheduleTime="11(R)") {
    // ex: 1(M)  3(M-T,R-F)   5(T-W,F)
    let numMap = {
        "1": "one",
        "HR": "two",
        "2": "three",
        "3": "four",
        "4": "five",
        "5": "six",
        "6": "seven",
        "7": "eight",
        "8": "nine",
        "9": "ten"
    };

    let periods = scheduleTime.split("(")[0].split("-").map(pd => numMap[pd]);
    const daysOfWeek = ["M", "T", "W", "R", "F"];
    let daysRaw = scheduleTime.split("(")[1].replace(")", "").split(",");

    let days = [];

    for (let dayInfo of daysRaw) {
        if (dayInfo.includes("-")) {
            let start = daysOfWeek.indexOf(dayInfo.split("-")[0]);
            let end = daysOfWeek.indexOf(dayInfo.split("-")[1]);

            for (let i = start; i <= end; i++) {
                days.push(daysOfWeek[i]);
            }
        } else {
            days.push(dayInfo);
        }
    }
    return [periods, days];
}

async function getClasses() {
    let classes = [];

    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["info"], (result) => {
            if (result["info"] == undefined) {
                console.log("No info found in storage");
            } else {
                let info = result["info"];
                for (let i = 0; i < Object.keys(info).length; i++) {
                    let key = Object.keys(info)[i];
                    if (key == "name") {
                        parent.postMessage(info[key]);
                    }
                    if (["lastUpdatedTimestamp", "name"].includes(key)) continue;
                    classes.push({
                        "name": key.includes("PE") ? "Gym" : key.replaceAll("_"," "),
                        "teacher": info[key]["teacher"].includes("Lunch") ? "" : info[key]["teacher"],
                        "room": key.includes("Lunch") ? "" : info[key]["room"],
                        "schedInfo": parseSched(info[key]["schedule"])
                    });
                }
                // console.log(classes);
            }
            return resolve(classes);
        });
    });

}

async function getContext() {
    let context = {
        "times": {
            "one": "8:00-8:50",
            "HR": "8:54-8:58",
            "two": "9:02-9:52",
            "three": "9:56-10:46",
            "four": "10:50-11:40",
            "five": "11:44-12:34",
            "six": "12:38-1:28",
            "seven": "1:32-2:22",
            "eight": "2:26-3:16",
            "nine": "3:20-4:10"
        },
    };

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const dayAbbrevs = {
        "M": "Monday",
        "T": "Tuesday",
        "W": "Wednesday",
        "R": "Thursday",
        "F": "Friday"
    }

    const classList = await getClasses();

    daysOfWeek.forEach(day => {
        context[day] = {};
    });
    // console.log(classList);

    classList.forEach((classData, i) => {
        //TODO: Consider actually using all the periods provided
        const period = classData.schedInfo[0][0];
        const days = classData.schedInfo[1];

        days.forEach(day => {
            context[dayAbbrevs[day]][period] = classData;
        });
    })

    daysOfWeek.forEach(day => {
        for (let pdName of ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]) {
            if (context[day][pdName] == undefined) {
                context[day][pdName] = {
                    "name": "Free",
                    "teacher": "",
                    "room": "",
                    "schedInfo": [[pdName], [day]]
                };
            }
        }
    });

    return context;
}

let classCells = document.getElementsByTagName("td");
let assignedColors = [];

for (let i = 0; i < classCells.length; i++) {
    let cell = classCells[i];
    if (cell.innerHTML === "") {
        continue;
    }

    let color = isUsed(assignedColors, Array.from(cell.classList).join(" ").trim());
    if (color) {
        cell.style.backgroundColor = color;
        cell.style.color = isDark(color);
        continue;
    }

    assignedColors.push({
        'val': Array.from(cell.classList).join(" ").trim(),
        'color': colors[assignedColors.length]
    });

    cell.style.backgroundColor = colors[assignedColors.length - 1];
    cell.style.color = isDark(colors[assignedColors.length - 1]);
}
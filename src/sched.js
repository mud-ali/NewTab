import Handlebars from "handlebars";

let source = require("./sched.handlebars");
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

let classes = {
    "Research": {
        "name": "Research",
        "teacher": "Liva, Michael",
        "room": "Room 168"
    },
    "Math": {
        "name": "AP Calculus AB",
        "teacher": "Nevard, John",
        "room": "Room 266"
    },
    "English": {
        "name": "IB Lit Lang I",
        "teacher": "Weems, Richard",
        "room": "Room 044"
    },
    "Spanish": {
        "name": "IB Español IV SL",
        "teacher": "Calandra, Gabriela",
        "room": "Room 125"
    },
    "Bio": {
        "name": "Honors Biology",
        "teacher": "Downey, Lindsay",
        "room": "Room 147"
    },
    "Physics": {
        "name": "Adv Phys for Eng",
        "teacher": "Liva, Michael",
        "room": "Room 168"
    },
    "APCS": {
        "name": "AP Computer Science A",
        "teacher": "Carter, Henry",
        "room": "Room 136"
    },
    "PE": {
        "name": "Physical Education",
        "teacher": "Marmora, Joseph",
        "room": "Gym"
    },
    "History": {
        "name": "IB Hist of Amer I HL",
        "teacher": "Kramer, Mark",
        "room": "Room 239"
    },
    "Electrical": {
        "name": "Electrical Eng",
        "teacher": "Liva, Michael",
        "room": "Room 168"
    },
    "Eng App": {
        "name": "Eng Applications Prog",
        "teacher": "Barbetta, Joseph",
        "room": "Room 166"
    },
    "Sock": {
        "name": "Sockets and Threading",
        "teacher": "Carter, Henry",
        "room": "Room 134"
    },
    "NetSec": {
        "name": "Network Security",
        "teacher": "Carter, Henry",
        "room": "Room 134"
    },
    "IGS": {
        "name": "IGS",
        "teacher": "Paul, Eric",
        "room": "Room 233"
    },
    "Lunch": {
        "name": "Lunch",
        "teacher": "",
        "room": "Upper Cafeteria"
    },
    "Free": {
        "name": "Free",
        "teacher": "",
        "room": ""
    },
    "Clubs": {
        "name": "CTF Club",
        "teacher": "Isecke, Benjamin",
        "room": "Room 138B"
    },
    "Guidance": {
        "name": "Junior Seminar",
        "teacher": "Belkin, Allison",
        "room": "Commons"
    },
    "Projects": {
        "name": "Applied Web App Dev",
        "teacher": "Wang, Ivy",
        "room": "Room 138A"
    },
    "": {
        "name": "",
        "teacher": "",
        "room": ""
    }
}

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

    "Monday": {
        "one": classes["Research"],
        "two": classes["IGS"],
        "three": classes["Math"],
        "four": classes["APCS"],
        "five": classes["English"],
        "six": classes["Physics"],
        "seven": classes["Lunch"],
        "eight": classes["Bio"],
        "nine": classes["Spanish"],
        "ten": classes["NetSec"]
    },
    "Tuesday": {
        "one": classes["Electrical"],
        "two": classes["IGS"],
        "three": classes["Math"],
        "four": classes["APCS"],
        "five": classes["Free"],
        "six": classes["History"],
        "seven": classes["Lunch"],
        "eight": classes["Bio"],
        "nine": classes["PE"],
        "ten": classes["Sock"]
    },
    "Wednesday": {
        "one": classes["Electrical"],
        "two": classes["IGS"],
        "three": classes["Projects"],
        "four": classes["Free"],
        "five": classes["English"],
        "six": classes["History"],
        "seven": classes["Lunch"],
        "eight": classes["Bio"],
        "nine": classes["Spanish"],
        "ten": classes["Clubs"]
    },
    "Thursday": {
        "one": classes["Electrical"],
        "two": classes["IGS"],
        "three": classes["Math"],
        "four": classes["APCS"],
        "five": classes["English"],
        "six": classes["Physics"],
        "seven": classes["Lunch"],
        "eight": classes["Bio"],
        "nine": classes["Spanish"],
        "ten": classes["NetSec"]
    },
    "Friday": {
        "one": classes["Electrical"],
        "two": classes["IGS"],
        "three": classes["Math"],
        "four": classes["APCS"],
        "five": classes["English"],
        "six": classes["History"],
        "seven": classes["Lunch"],
        "eight": classes["Research"],
        "nine": classes["PE"],
        "ten": classes["Sock"]
    }
}

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

output.innerHTML = source(context);

let classCells = document.getElementsByTagName("td");
let assignedColors = [];

for (let i = 0; i < classCells.length; i++) {
    let cell = classCells[i];
    if (cell.innerHTML === "") {
        continue;
    }
    
    let color = isUsed(assignedColors, cell.innerHTML);
    if (color) {
        cell.style.backgroundColor = color;
        cell.style.color = isDark(color);
        continue;
    }
    
    assignedColors.push({
        'val': cell.innerHTML,
        'color': colors[assignedColors.length]
    });
    
    cell.style.backgroundColor = colors[assignedColors.length - 1];
    cell.style.color = isDark(colors[assignedColors.length - 1]);
}
console.log(assignedColors.length);
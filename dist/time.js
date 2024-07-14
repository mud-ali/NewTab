const clock = document.getElementById("clock");
let nameOfUser = "";

function getTime() {
    const date = new Date();
    let hours = String(date.getHours() % 12).padStart(2, "0");
    hours = hours === "00" ? "12" : hours;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const AM_PM = date.getHours() >= 12 ? "PM" : "AM";
    clock.innerHTML = `${hours}:${minutes}:${seconds} ${AM_PM}
        <br/>
        Welcome ${nameOfUser}!`;
    setTimeout(getTime, 1000);
}

window.addEventListener("message", (e) => {
    nameOfUser = e.data.split(" ")[0] + " " + e.data.split(" ")[e.data.split(" ").length - 1];
})

getTime();
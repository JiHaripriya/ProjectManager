// Add new project 
const newProject = document.getElementById("new-project")
newProject.addEventListener('click', (event) => {
    modal.style.display = "flex"
})

// Add new project form
const modal = document.getElementById("myModal");
const span = document.getElementById("close");
span.onclick = () => modal.style.display = "none";

// Add new project form validation
const addProject = document.getElementById("add-project")
addProject.addEventListener('click', (event) => console.log(event))

// Date validation
const startDate = document.getElementById("start-date"),
endDate = document.getElementById("end-date")


const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2)  day = '0' + day;

    return [year, month, day].join('-');
}

startDate.setAttribute("min", formatDate(new Date()))
endDate.setAttribute("min", formatDate(new Date()))


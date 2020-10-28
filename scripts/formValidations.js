// Add new project form validation
const addProject = document.getElementById("add-project")

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

// Get form details
const projectName = document.getElementById("project-name"), //keyup
clientName = document.getElementById("client-name"), //keyup
projectManager = document.getElementById("project-manager"), //keyup
description = document.getElementById("description"), //keydown
newProjectForm = document.getElementById("new-project-form")

const displayTimedMessage = (htmlElement, color, displayType) => {
    if(displayType == "show") htmlElement.style.color = color
    else if(displayType == "hide") setTimeout(() => { htmlElement.style.color = "rgb(1, 18, 72)"}, 3500) 
}

const checkTextLength = (textElement, minLength, maxLength) => {
    if ( textElement.length >= minLength && textElement.length <= maxLength) return true
    else return false
}

newProjectForm.addEventListener('keyup', (e) => {
    if (checkTextLength(e.target.value, e.target.getAttribute('minlength'), e.target.getAttribute('maxlength'))) {
        displayTimedMessage(e.target, "green", "show")
        displayTimedMessage(e.target, "", "hide")
    }
    else displayTimedMessage(e.target, "red", "show")
})

newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const projectNameStatus = checkTextLength(projectName.value, projectName.getAttribute('minlength'), projectName.getAttribute('maxlength')),
    clientNameStatus = checkTextLength(clientName.value, clientName.getAttribute('minlength'), clientName.getAttribute('maxlength')),
    projectManagerStatus = checkTextLength(projectManager.value, projectManager.getAttribute('minlength'), projectManager.getAttribute('maxlength')),
    descriptionStatus = checkTextLength(description.value, description.getAttribute('minlength'), description.getAttribute('maxlength'))
    
    if(projectNameStatus && clientNameStatus && projectManagerStatus && descriptionStatus) {
        const projectDetails = {
            projectName: projectName.value,
            clientName: clientName.value,
            projectManager: projectManager.value,
            startDate: startDate.value,
            endDate: endDate.value,
            technologies: technologies.value,
            description: description.value
        }
        console.log(projectDetails)
    }
})
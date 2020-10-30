/**************************************************** 
        *   PROJECT FORM VALIDATION  * 
*****************************************************/

const addProject = document.getElementById("add-project"),
cancelProject = document.getElementById("cancel"),
progress = document.getElementById("range")

// Project Progress
progress.addEventListener("change", (e) => document.querySelector(".range-label").textContent = e.currentTarget.value)

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
// Number of days left value
const daysLeft = Math.round(Math.abs(((new Date("10/31/2020").getTime() - new Date().getTime())/ (24 * 60 * 60 * 1000))))

// Get form details
const projectName = document.getElementById("project-name"), //keyup
clientName = document.getElementById("client-name"), //keyup
projectManager = document.getElementById("project-manager"), //keyup
description = document.getElementById("description"), //keydown
newProjectForm = document.getElementById("project-form")

const displayTimedMessage = (htmlElement, color, displayType) => {
    if(displayType == "show") htmlElement.style.border = `1.6px solid ${color}`
    else if(displayType == "hide") setTimeout(() => { htmlElement.style.border = "1px solid rgb(1, 18, 72)"}, 5500) 
}

//Check whether input has only alphabets
RegExp.prototype.isAlpha = function (input) { return /^[A-Za-z ]*$/.test(input) }

const checkTextLength = (textElement, minLength, maxLength) => {
    if ( textElement.length >= minLength && textElement.length <= maxLength) return true
    else return false
}

newProjectForm.addEventListener('keyup', (e) => {
    if (e.target.type != "button") {
        if (checkTextLength(e.target.value, e.target.getAttribute('minlength'), e.target.getAttribute('maxlength'))) {
            if(RegExp.prototype.isAlpha(e.target.value)) {
                displayTimedMessage(e.target, "green", "show")
                displayTimedMessage(e.target, "", "hide")
            }
            else displayTimedMessage(e.target, "red", "show")
        }
        else {displayTimedMessage(e.target, "red", "show")}
    }
})

newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const projectNameStatus = checkTextLength(projectName.value, projectName.getAttribute('minlength'), projectName.getAttribute('maxlength')),
    clientNameStatus = checkTextLength(clientName.value, clientName.getAttribute('minlength'), clientName.getAttribute('maxlength')),
    projectManagerStatus = checkTextLength(projectManager.value, projectManager.getAttribute('minlength'), projectManager.getAttribute('maxlength')),
    descriptionStatus = checkTextLength(description.value, description.getAttribute('minlength'), description.getAttribute('maxlength'))
    
    if(projectNameStatus && clientNameStatus && projectManagerStatus && descriptionStatus && (startDate.value < endDate.value)) {
        const projectDetails = {
            projectName: projectName.value,
            clientName: clientName.value,
            projectManager: projectManager.value,
            startDate: startDate.value,
            endDate: endDate.value,
            technologies: technologies.value,
            description: description.value
        }
        window.location.reload()
        console.log(projectDetails)
    } // Display error messages
    else {
        if(!(startDate.value < endDate.value)) {
            document.getElementById("dates-error").style.display = "block"
            setTimeout(() => {  document.getElementById("dates-error").style.display = "none"}, 5500) 
            displayTimedMessage(endDate, "red", "show")
            displayTimedMessage(endDate, "", "hide")
        }
    }
})

cancelProject.addEventListener('click', _ => window.location.reload())


/**************************************************** 
        *   RESOURCE FORM VALIDATION  * 
*****************************************************/
const cancelResource = document.getElementById("cancel-resource")
cancelResource.addEventListener('click', _ => window.location.reload())
/****************************************************************** 
        *   GENERAL FORM VALIDATION AND MESSAGE DISPLAY FUNCTIONS * 
*******************************************************************/
const displayTimedMessage = (htmlElement, color, displayType) => {
    if(displayType == "show") htmlElement.style.border = `1.6px solid ${color}`
    else if(displayType == "hide") setTimeout(() => { htmlElement.style.border = "1px solid rgb(1, 18, 72)"}, 5500) 
}
const clearHighlight = (targetElement) => {
    displayTimedMessage(targetElement, "green", "show")
    displayTimedMessage(targetElement, "", "hide")
}
const errorMessages = (targetLabel, targetElementId, errorMsg ) => {
    document.querySelector(targetElementId).textContent = errorMsg
    displayTimedMessage(targetLabel, "red", "show")
}

const emailPatternCheck = (email) => {
    const emailPattern = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$", "g")
    if (email.match(emailPattern)) return true
    else return false
}

//Check whether input has only alphabets
RegExp.prototype.isAlpha = function (input) { return /^[A-Za-z ]*$/.test(input) }

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
endDate = document.getElementById("end-date"),
dates = document.querySelector(".dates")

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

projectName.addEventListener('keyup', _=> {
    document.querySelector("#pname-error").textContent = ""
    clearHighlight(projectName)
})
clientName.addEventListener('keyup', _=> {
    document.querySelector("#cname-error").textContent = ""
    clearHighlight(clientName)
})
projectManager.addEventListener('keyup', _=> {
    document.querySelector("#pmname-error").textContent = ""
    clearHighlight(projectManager)
})
description.addEventListener('keydown', _=> {
    document.querySelector("#description-error").textContent = ""
    clearHighlight(description)
})
dates.addEventListener('click', _=> {
    document.querySelector("#dates-error").textContent = ""
    clearHighlight(endDate)
})

newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const projectNameStatus = projectName.value.length == 0 ? false : true,
    clientNameStatus = clientName.value.length == 0 ?  false : true ,
    projectManagerStatus = RegExp.prototype.isAlpha(projectManager.value) && projectManager.value.length != 0 ? true : false,
    dateStatus = startDate.value < endDate.value ? true : false,
    descriptionStatus = description.value.length == 0 ?  false : true 

    if(projectNameStatus && clientNameStatus && projectManagerStatus && descriptionStatus && dateStatus) {
        const projectDetails = {
            projectName: projectName.value,
            clientName: clientName.value,
            projectManager: projectManager.value,
            startDate: startDate.value,
            endDate: endDate.value,
            technologies: technologies.value,
            description: description.value
        }
        // window.location.reload()
        console.log(projectDetails)
    } // Display error messages
    else {
        if(!projectNameStatus) errorMessages(projectName, "#pname-error", "This field cannot be empty")
        if(!clientNameStatus) errorMessages(clientName, "#cname-error", "This field cannot be empty")
        if(!projectManagerStatus){
            if(projectManager.value.length == 0)  errorMessages(projectManager, "#pmname-error", "This field cannot be empty")
            else errorMessages(projectManager, "#pmname-error", "Only alphabets and spaces are allowed")
        } 
        if(!dateStatus) errorMessages(endDate, "#dates-error", "Enter a valid end date")
        if(!descriptionStatus) errorMessages(description, "#description-error", "This field cannot be empty")
    }
})

cancelProject.addEventListener('click', _ => window.location.reload())

/**************************************************** 
        *   RESOURCE FORM VALIDATION  * 
*****************************************************/
const resourceForm = document.getElementById("resource-form")
const createResourceObject= (name, email, role, billable, rate) => {
    const resourceDetails = {
        resourceName: name,
        email: email,
        role: role,
        billable: billable,
        rate: rate
    }
    return resourceDetails
}
const addResources = document.getElementById("add-resource"), resourceName = document.getElementById("name"), email = document.getElementById("email"),
role = document.getElementById("role"), billableStatus = document.getElementById("billable"), rate = document.getElementById("rate")

resourceName.addEventListener('keyup', _=> {
    document.querySelector("#name-error").textContent = ""
    clearHighlight(resourceName)
})
email.addEventListener('keyup', _=> {
    document.querySelector("#email-error").textContent = ""
    clearHighlight(email)
})
role.addEventListener('keyup', _=> {
    document.querySelector("#role-error").textContent = ""
    clearHighlight(role)
})
billableStatus.addEventListener('click', _ => {
    document.querySelector("#rate-error").textContent = ""
    clearHighlight(rate)
})
rate.addEventListener('keyup', _=> {
    document.querySelector("#rate-error").textContent = ""
    clearHighlight(rate)
})

resourceForm.addEventListener('submit', e => {
    e.preventDefault()
    const nameStatus = resourceName.value.length != 0 && RegExp.prototype.isAlpha(resourceName.value) ? true : false,
    emailStatus = email.value.length > 0 && emailPatternCheck(email.value) ? true: false
    roleStatus = role.value.length != 0 && RegExp.prototype.isAlpha(role.value) ? true : false,
    rateStatus = rate.value != "" && billableStatus.checked ? true : false

    if(nameStatus && emailStatus && roleStatus) {
        if (billableStatus.checked) { // Billable true
            if(rateStatus) {
                console.log(createResourceObject(resourceName.value, email.value, role.value, billableStatus.checked, Number(rate.value)))
            }// Rate field empty error
            else errorMessages(rate, "#rate-error", "Enter a valid amount")
        } // billable false
        else console.log(createResourceObject(resourceName.value, email.value, role.value, billableStatus.checked, 0))
    } // Name or email or role empty OR contains characters other than alphabets and spaces
    else {
        if(!nameStatus) {
            resourceName.value.length == 0 ? errorMessages(resourceName, "#name-error", "This field cannot be empty") : (RegExp.prototype.isAlpha(resourceName.value) ? _ : errorMessages(resourceName, "#name-error", "Only alphabets and spaces are allowed"))
        }
        if(!emailStatus) {
            email.value.length == 0 ? errorMessages(email, "#email-error", "This field cannot be empty") : (emailPatternCheck(email.value) ? _ : errorMessages(email, "#email-error", "Invalid email address"))
        }
        if(!roleStatus) {
            role.value.length == 0 ? errorMessages(role, "#role-error", "This field cannot be empty") : (RegExp.prototype.isAlpha(role.value) ? _ : errorMessages(role, "#role-error", "Only alphabets and spaces are allowed"))
        }
    }
})

const cancelResource = document.getElementById("cancel-resource")
cancelResource.addEventListener('click', _ => window.location.reload())
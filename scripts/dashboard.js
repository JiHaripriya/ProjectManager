// Add new project 
const modal = document.getElementById("new-project-modal"), 
newProject = document.getElementById("new-project"), 
editProject = document.getElementById("project-headings--edit"), 
addResource = document.getElementById("add-resource-icon"),
editResource = document.getElementsByClassName("edit-icon"),
deleteResource = document.getElementsByClassName("delete-icon"),
billable = document.getElementById("billable")

// New Project
newProject.addEventListener('click', (event) => {
    modal.style.display = "flex"
    document.getElementById("modal-content-project").style.display = "block"
    // Hide slider and change button text
    document.getElementById("form-project-progress").style.display = "none"
    document.getElementById("add-project").value = "Add Project"
    document.getElementById("modal-content--resource").style.display = "none"
    document.getElementById("modal-content--delete-resource").style.display = "none"
})


// Edit Project
editProject.addEventListener('click', (e) => {
    modal.style.display = "flex"
    document.getElementById("modal-content-project").style.display = "block"
    document.getElementById("modal-content--resource").style.display = "none"
    // Display slider and change button text
    document.getElementById("form-project-progress").style.display = "block"
    document.getElementById("add-project").value = "Update Project"
    document.getElementById("modal-content--delete-resource").style.display = "none"
})

// Add Resource
addResource.addEventListener('click', (e) => {
    modal.style.display = "flex"
    document.getElementById("modal-content-project").style.display = "none"
    document.getElementById("modal-content--resource").style.display = "block"
    document.getElementById("modal-content--delete-resource").style.display = "none"
})

// Edit Resource
for (let eachResource of editResource) {
    eachResource.addEventListener('click', (e) => {
        modal.style.display = "flex"
        document.getElementById("modal-content-project").style.display = "none"
        document.getElementById("modal-content--resource").style.display = "block"
        document.getElementById("modal-content--delete-resource").style.display = "none"
    })
}

// Delete Resource
for (let eachResource of deleteResource) {
    eachResource.addEventListener('click', (e) => {
        modal.style.display = "flex"
        document.getElementById("modal-content-project").style.display = "none"
        document.getElementById("modal-content--resource").style.display = "none"
        document.getElementById("modal-content--delete-resource").style.display = "block"
    })
}

// Billable status
billable.addEventListener('click', (e) => {
    const status = billable.checked
    if (status) document.getElementById("rate-label").style.display = "flex"
    else document.getElementById("rate-label").style.display = "none"
})


// Get progress bar
const progressBar = document.getElementById("progress-bar"),
progressPercent = document.getElementById("progress-percent"),
progressBarMain = document.getElementById("progress-bar-main"),
progressPercentMain = document.getElementById("progress-percent-main"),
percent = 50 // <-- Value for each project
progressPercent.innerText = percent + "%"
progressPercentMain.innerText = percent + " %"
progressBar.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${percent}%, var(--light-blue) 1%)`
progressBarMain.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${percent}%, var(--light-blue) 1%)`

// Tabbed View related functionailities
const detailsTab = document.getElementById("project-headings--details"), 
resourceTab = document.getElementById("project-headings--resources"),
invoiceTab = document.getElementById("project-headings--invoice"),
tabHeight =  document.getElementById("project-details-tab").offsetHeight,
projectListHeight = document.querySelector('.project-details').offsetHeight,
resourceBody = document.getElementById("resource"),
invoiceBody = document.getElementById("invoice"),
projectList = document.getElementById("project-list")
console.log(projectListHeight)
// Set height of each tab
const setHeight = (tab, limit, height) => {
    if(limit == "minimum") tab.style.minHeight = `${height}px`
    else tab.style.maxHeight = `${height}px`
}
setHeight(resourceBody, "minimum", tabHeight)
setHeight(invoiceBody, "minimum", tabHeight)
// // Mobile and desktop view for project list
// if(screen.availWidth <= 936) setHeight(projectList, "maximum", projectListHeight)
setHeight(projectList, "maximum", projectListHeight)

// Highlight tab on select
headingId = ["project-details-tab", "resource", "invoice"]
const setVisibility = (id, propertyValue) => {
    let currentTab = document.getElementById(id)
    currentTab.style.display = propertyValue

    // Set visibility and color for other tabs
    headingId.filter(item => item != id).forEach (eachTab => {
            currentTab = document.getElementById(eachTab)
            currentTab.style.display = "none"
            // Toggle color for each tab (Details, Resources and Invoice)
            if(currentTab.id.toLowerCase().includes("detail")){ detailsTab.style.backgroundColor = "rgb(227, 235, 255)"}
            if(currentTab.id.toLowerCase().includes("resource")){ resourceTab.style.backgroundColor = "rgb(227, 235, 255)"}
            if(currentTab.id.toLowerCase().includes("invoice")){ invoiceTab.style.backgroundColor = "rgb(227, 235, 255)"}
    })
}

detailsTab.addEventListener('click', _ => {
    detailsTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("project-headings--edit").style.display = "block"
    document.getElementById("add-resource-icon").style.display = "none"
    setVisibility("project-details-tab", "block")
})

resourceTab.addEventListener('click', _ => {
    resourceTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("project-headings--edit").style.display = "none"
    document.getElementById("add-resource-icon").style.display = "block"
    setVisibility("resource", "flex")
})

invoiceTab.addEventListener('click', _ => {
    invoiceTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("add-resource-icon").style.display = "none"
    document.getElementById("project-headings--edit").style.display = "none"
    setVisibility("invoice", "flex")
})
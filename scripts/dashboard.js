let projects;
let resources;
let selectedProjectId = 0;
const fetchDashboardData = () => {
    get(urlList.projects, secretKey, storeProjectData);
    get(urlList.resources, secretKey, storeResourceData);
    loadProjectList();
}

fetchDashboardData();

function loadProjectList() {
    projectArray = projects.projectList;
    if (projectArray.length) {
        const projectList = document.querySelector('#project-list');
        projectArray.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-list__item');
            projectCard.setAttribute('project-id', `${project.projectId}`);
            const projectInfo = document.createElement('span');
            projectInfo.classList.add('display-flex', 'project-progress');
            const projectName = document.createElement('span');
            projectName.classList.add('stretch-heading');
            projectName.innerText = `${project.projectName}`;
            const progressBar = document.createElement('span');
            progressBar.classList.add('circular', 'display-flex', 'flex-center');
            progressBar.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${project.progress}%, var(--light-blue) 1%)`;
            const progressPercent = document.createElement('span');
            progressPercent.classList.add('inner', 'display-flex', 'flex-center');
            progressPercent.innerText = `${project.progress}%`;
            progressBar.appendChild(progressPercent);
            projectInfo.appendChild(projectName);
            projectInfo.appendChild(progressBar);
            projectCard.appendChild(projectInfo);
            projectList.appendChild(projectCard);
        });
    }

    loadDetails();
    loadResources();
}

function loadDetails() {
    const selectedProject = projects.projectList[selectedProjectId];

    const sectionOne = document.querySelector('#section1');
    const projectName = document.createElement('span');
    projectName.style.fontSize = "25px";
    projectName.innerText = `${selectedProject.projectName}`;
    const clientName = document.createElement('span');
    clientName.innerText = `Client: ${selectedProject.clientName}`;
    const projectManager = document.createElement('span');
    projectManager.innerText = `Project Manager: ${selectedProject.projectManager}`;
    const projectStatus = document.createElement('span');
    projectStatus.innerText = `Status: ${selectedProject.projectStatus}`;
    sectionOne.appendChild(projectName);
    sectionOne.appendChild(clientName);
    sectionOne.appendChild(projectManager);
    sectionOne.appendChild(projectStatus);

    const projectProgress = document.querySelector('#project-progress--main');
    const progressBar = document.createElement('span');
    progressBar.classList.add('circular--main', 'display-flex', 'flex-center');
    progressBar.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${selectedProject.progress}%, var(--light-blue) 1%)`;
    const progressPercent = document.createElement('span');
    progressPercent.classList.add('inner--main', 'display-flex', 'flex-center');
    progressPercent.innerText = `${selectedProject.progress}%`;
    progressBar.appendChild(progressPercent);
    projectProgress.appendChild(progressBar);

    const sectionThree = document.querySelector('#section3');
    const startDate = createSpanTag(`Start Date: ${selectedProject.startDate}`);
    const endDate = createSpanTag(`End Date: ${selectedProject.endDate}`);
    sectionThree.appendChild(startDate);
    sectionThree.appendChild(endDate);

    const tagList = document.querySelector('#tag-list');
    selectedProject.technologies.forEach(technology => {
        const technologyTag = createSpanTag(technology);
        technologyTag.classList.add('tags');
        tagList.appendChild(technologyTag);
    });

    const description = document.querySelector('#project-description');
    description.innerText = selectedProject.description;
}

function createSpanTag(text) {
    const spanTag = document.createElement('span');
    spanTag.innerText = text;
    return spanTag;
}


function loadResources() {
    const resourceTableBody = document.querySelector('#resource-table--body');
    let resourceList = resources[selectedProjectId];
    resourceList.forEach(resource => {
        const tableRow = document.createElement('tr');
        for (const key in resource) {
            if (resource.hasOwnProperty(key)) {
                const cell = createTableCell(resource[key]);
                tableRow.appendChild(cell);
            }
        }
        const editButtonCell = createButtonCell('edit');
        tableRow.appendChild(editButtonCell);
        const deleteButtonCell = createButtonCell('delete');
        tableRow.appendChild(deleteButtonCell);
        resourceTableBody.appendChild(tableRow);
    });
}

function createTableCell(value) {
    const cell = document.createElement('td');
    cell.innerText = value;
    if (typeof (value) === 'number') {
        cell.style.textAlign = 'right';
    }
    return cell;
}

function createButtonCell(buttonType) {
    const cell = document.createElement('td');
    cell.classList.add('remove-background', 'addBorder');
    const [src, alt, classListArray] = buttonType === 'edit' ? ['images/edit.png', 'Pen icon', ['table-icons', 'edit-icon']] : ['images/delete-icon.png', 'Trash bin icon', ['table-icons', 'delete-icon']];
    cell.appendChild(createImageTag(src, alt, classListArray));
    return cell;
}

function createImageTag(src, alt, classListArray) {
    const imageTag = document.createElement('img');
    imageTag.src = src;
    imageTag.alt = alt;
    classListArray.forEach(className => {
        imageTag.classList.add(className);
    });
    return imageTag;
}

function generateInvoice() {
    const numberOfWorkingDays = document.querySelector('#days');
    if (numberOfWorkingDays.value.match(/^\d+$/)) {
        const displayInvoice = document.querySelectorAll('.display-on-invoice-generate');
        displayInvoice.forEach(tag => {
            tag.style.display = 'block';
        });
        const workingHoursPerDay = 8;
        const invoiceTable = document.querySelector('#invoice-table');
        removeTableBodyRows(invoiceTable);
        let resourceList = resources[selectedProjectId];
        let invoiceAmount = 0;
        resourceList.forEach(resource => {
            if (resource.billable === true) {
                const tableRow = document.createElement('tr');
                const resourceName = createTableCell(`${resource.name}`);
                const ratePerHour = createTableCell(`${resource.ratePerHour}`);
                const resourceCost = createTableCell(`${resource.ratePerHour * workingHoursPerDay * numberOfWorkingDays.value}`);
                invoiceAmount += parseInt(resourceCost.innerText);
                tableRow.appendChild(resourceName);
                tableRow.appendChild(ratePerHour);
                tableRow.appendChild(resourceCost);
                invoiceTable.appendChild(tableRow);
            }
        });
        const totalCost = document.querySelector('#total-cost');
        totalCost.innerText = `Total Amount: ${invoiceAmount}`;
    } else {

    }

}

//Function to remove current rows from table body
function removeTableBodyRows(tableBody) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

const invoiceGenerateButton = document.querySelector('#invoice-generate--button');
invoiceGenerateButton.addEventListener('click', generateInvoice);
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

// TOGGLE PROJECT
// Add some button animation
// const project1Name = document.getElementById("project-1"), project2Name = document.getElementById("project-2"),
//     project1 = document.getElementById("project-1--content"), project2 = document.getElementById("project-2--content")

// project1Name.addEventListener('click', e => {
//     project1.style.display = "block"
//     project2.style.display = "none"
// })

// project2Name.addEventListener('click', e => {
//     project2.style.display = "block"
//     project1.style.display = "none"
// })

// Get progress bar
// const progressBar = document.getElementById("progress-bar"),
//     progressPercent = document.getElementById("progress-percent"),
//     progressBarMain = document.getElementById("progress-bar-main"),
//     progressPercentMain = document.getElementById("progress-percent-main"),
//     percent = 50 // <-- Value for each project
// progressPercent.innerText = percent + "%"
// progressPercentMain.innerText = percent + " %"
// progressBar.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${percent}%, var(--light-blue) 1%)`
// progressBarMain.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${percent}%, var(--light-blue) 1%)`

// Tabbed View related functionailities
const detailsTab = document.getElementById("project-headings--details"),
    resourceTab = document.getElementById("project-headings--resources"),
    invoiceTab = document.getElementById("project-headings--invoice"),
    tabHeight = document.getElementById("project-details-tab").offsetHeight,
    resourceBody = document.getElementById("resource"),
    invoiceBody = document.getElementById("invoice"),
    projectList = document.getElementById("project-list")

// Set height of each tab
const setHeight = (tab, limit, height) => {
    if (limit == "minimum") tab.style.minHeight = `${height}px`
    else tab.style.maxHeight = `${height + detailsTab.offsetHeight - 8}px`
}

setHeight(document.getElementById("project-details-tab"), "minimum", tabHeight)
setHeight(resourceBody, "minimum", tabHeight)
setHeight(invoiceBody, "minimum", tabHeight)
setHeight(projectList, "maximum", tabHeight)

// Highlight tab on select
headingId = ["project-details-tab", "resource", "invoice"]
const setVisibility = (id, propertyValue) => {
    let currentTab = document.getElementById(id)
    currentTab.style.display = propertyValue

    // Set visibility and color for other tabs
    headingId.filter(item => item != id).forEach(eachTab => {
        currentTab = document.getElementById(eachTab)
        currentTab.style.display = "none"
        // Toggle color for each tab (Details, Resources and Invoice)
        if (currentTab.id.toLowerCase().includes("detail")) { detailsTab.style.backgroundColor = "rgb(227, 235, 255)" }
        if (currentTab.id.toLowerCase().includes("resource")) { resourceTab.style.backgroundColor = "rgb(227, 235, 255)" }
        if (currentTab.id.toLowerCase().includes("invoice")) { invoiceTab.style.backgroundColor = "rgb(227, 235, 255)" }
    })
}

detailsTab.addEventListener('click', _ => {
    detailsTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("project-headings--edit").style.display = "block"
    setVisibility("project-details-tab", "block")
})

resourceTab.addEventListener('click', _ => {
    resourceTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("project-headings--edit").style.display = "none"
    setVisibility("resource", "flex")
})

invoiceTab.addEventListener('click', _ => {
    invoiceTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("project-headings--edit").style.display = "none"
    setVisibility("invoice", "flex")
})
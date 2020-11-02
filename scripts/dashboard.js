// Global variables to store data commonly accessed by multiple functions.
let projects;
let resources;
let selectedProjectId;

// Fetches all dashboard data.
const fetchDashboardData = () => {
    get(urlList.projects, secretKey, storeProjectData);
    get(urlList.resources, secretKey, storeResourceData);

    selectedProjectId = projects.projectList.length - 1;
    loadProjectList();
}

fetchDashboardData();

// Loads list of all projects - recently added will come first.
function loadProjectList() {
    projectArray = projects.projectList.map(element => element);
    projectArray.reverse();
    if (projectArray.length) {
        const projectList = document.querySelector('#project-list');
        projectArray.forEach(project => {
            const projectCard = projectCardConfig(project);
            projectList.appendChild(projectCard);

            // Adds an event listener to each project card.
            // Invokes function to implement selection of project card.
            projectCard.addEventListener('click', function (e) {
                console.log(selectedProjectId);

                const newSelectedProjectId = e.currentTarget.dataset.projectid;
                selectProject(newSelectedProjectId);
            });
        });
    }
    loadDetails();
    loadResources();
}

function projectCardConfig(project) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-list__item');
    projectCard.setAttribute('data-projectid', `${project.projectId}`);

    const projectInfo = document.createElement('span');
    projectInfo.classList.add('display-flex', 'project-progress');

    const projectName = createSpanTag(`${project.projectName}`);
    projectName.classList.add('stretch-heading');

    const progressBar = createProgressBar(project.progress);

    projectInfo.appendChild(projectName);
    projectInfo.appendChild(progressBar);
    projectCard.appendChild(projectInfo);
    return projectCard;
}

// Removes selection class from currently selected project card and 
// adds it to newly selected project card and loads its details and resources.
function selectProject(newSelectedProjectId) {
    const currentProject = document.querySelector(`[data-projectid=${JSON.stringify(selectedProjectId)}]`);
    currentProject.classList.remove('selection');
    const selectedProjectId = newSelectedProjectId;
    const newSelectedProject = document.querySelector(`[data-projectid=${JSON.stringify(selectedProjectId)}]`);
    newSelectedProject.classList.add('selection');
    loadDetails();
    loadResources();
}

// Loads project details tab.
function loadDetails() {
    const selectedProject = projects.projectList[selectedProjectId];

    // Section One - Project name, client name, project manager, project status
    const sectionOne = document.querySelector('#section1');
    const projectName = createSpanTag(`${selectedProject.projectName}`);
    projectName.style.fontSize = "25px";
    const clientName = createSpanTag(`Client: ${selectedProject.clientName}`);
    const projectManager = createSpanTag(`Project Manager: ${selectedProject.projectManager}`);
    const projectStatus = createSpanTag(`Status: ${selectedProject.projectStatus}`);
    sectionOne.appendChild(projectName);
    sectionOne.appendChild(clientName);
    sectionOne.appendChild(projectManager);
    sectionOne.appendChild(projectStatus);

    // Section Two - Project progress pie chart
    const projectProgress = document.querySelector('#project-progress--main');
    const progressBar = createProgressBar(selectedProject.progress, main = true);
    projectProgress.appendChild(progressBar);

    // Section Three - Project start and end dates
    const sectionThree = document.querySelector('#section3');
    const startDate = createSpanTag(`Start Date: ${selectedProject.startDate}`);
    const endDate = createSpanTag(`End Date: ${selectedProject.endDate}`);
    sectionThree.appendChild(startDate);
    sectionThree.appendChild(endDate);

    // Technologies tag list
    const tagList = document.querySelector('#tag-list');
    selectedProject.technologies.forEach(technology => {
        const technologyTag = createSpanTag(technology);
        technologyTag.classList.add('tags');
        tagList.appendChild(technologyTag);
    });

    // Project Description
    const description = document.querySelector('#project-description');
    description.innerText = selectedProject.description;
}

// Loads project resources tab.
function loadResources() {
    const resourceTableBody = document.querySelector('#resource-table--body');
    removeTableBodyRows(resourceTableBody);
    let resourceList = resources[selectedProjectId];
    if (resourceList.length) {
        resourceList.forEach((element, index) => {
            const tableRow = document.createElement('tr');
            for (const key in element) {
                if (element.hasOwnProperty(key)) {
                    const cell = createTableCell(element[key]);
                    tableRow.appendChild(cell);
                }
            }
            const editButtonCell = createButtonCell('edit');
            editButtonCell.setAttribute('data-editresourceid', index);
            tableRow.appendChild(editButtonCell);
            const deleteButtonCell = createButtonCell('delete');
            deleteButtonCell.setAttribute('data-deleteresourceid', index);
            tableRow.appendChild(deleteButtonCell);
            resourceTableBody.appendChild(tableRow);
        });
    } else {
        // Add some message saying no resources added.
    }
}


function generateInvoice() {
    const numberOfWorkingDays = document.querySelector('#days');
    const errorMessage = document.querySelector('#working-days--errormsg');
    let errorMessageContent = '';

    if (numberOfWorkingDays.value.match(/^\d+(.0)*$/)) {
        
        const displayInvoice = document.querySelectorAll('.display-on-invoice-generate');
        displayInvoice.forEach(tag => {
            tag.style.display = 'block';
        });

        const workingHoursPerDay = 8;

        const invoiceTable = document.querySelector('#invoice-table');
        removeTableBodyRows(invoiceTable);

        let invoiceAmount = 0;

        let resourceList = resources[selectedProjectId];
        if (resourceList) {
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
        }
        const totalCost = document.querySelector('#total-cost');
        totalCost.innerText = `Total Amount: ${invoiceAmount}`;
    } else {
        errorMessageContent = 'Please enter a valid number of working days.'
    }
    return updateErrorMessage(numberOfWorkingDays, errorMessage, errorMessageContent);
}

// Invoice generate button event listener.
const invoiceGenerateButton = document.querySelector('#invoice-generate--button');
invoiceGenerateButton.addEventListener('click', generateInvoice);


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

// Tabbed View related functionailities
const detailsTab = document.getElementById("project-headings--details"),
    resourceTab = document.getElementById("project-headings--resources"),
    invoiceTab = document.getElementById("project-headings--invoice"),
    tabHeight = document.getElementById("project-details-tab").offsetHeight,
    resourceBody = document.getElementById("resource"),
    invoiceBody = document.getElementById("invoice"),
    projectList = document.getElementById("project-list");

// Set height of each tab
const setHeight = (tab, limit, height) => {
    if (limit == "minimum") tab.style.minHeight = `${height}px`;
    else tab.style.maxHeight = `${height + detailsTab.offsetHeight - 8}px`;
}

setHeight(document.getElementById("project-details-tab"), "minimum", tabHeight);
setHeight(resourceBody, "minimum", tabHeight);
setHeight(invoiceBody, "minimum", tabHeight);
setHeight(projectList, "maximum", tabHeight);

// Highlight tab on select
headingId = ["project-details-tab", "resource", "invoice"];
const setVisibility = (id, propertyValue) => {
    let currentTab = document.getElementById(id);
    currentTab.style.display = propertyValue;

    // Set visibility and color for other tabs
    headingId.filter(item => item != id).forEach(eachTab => {
        currentTab = document.getElementById(eachTab);
        currentTab.style.display = "none";

        // Toggle color for each tab (Details, Resources and Invoice)
        if (currentTab.id.toLowerCase().includes("detail")) { detailsTab.style.backgroundColor = "rgb(227, 235, 255)"; }
        if (currentTab.id.toLowerCase().includes("resource")) { resourceTab.style.backgroundColor = "rgb(227, 235, 255)"; }
        if (currentTab.id.toLowerCase().includes("invoice")) { invoiceTab.style.backgroundColor = "rgb(227, 235, 255)"; }
    })
}

detailsTab.addEventListener('click', _ => {
    detailsTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("project-headings--edit").style.display = "block"
    setVisibility("project-details-tab", "block")
});

resourceTab.addEventListener('click', _ => {
    resourceTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("project-headings--edit").style.display = "none"
    setVisibility("resource", "flex")
});

invoiceTab.addEventListener('click', _ => {
    invoiceTab.style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById("project-headings--edit").style.display = "none"
    setVisibility("invoice", "flex")
});
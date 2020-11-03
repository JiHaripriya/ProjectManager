// Globally accessible variable to store whether function should add a new project or update an existing project.

let addProjectFunction = true;

function addOrUpdateProject(e) {

    e.preventDefault()
    // Check if all form input fields are valid.
    const projectNameStatus = projectName.value.length == 0 ? false : true,
        clientNameStatus = clientName.value.length == 0 ? false : true,
        projectManagerStatus = RegExp.prototype.isAlpha(projectManager.value) && projectManager.value.length != 0 ? true : false,
        dateStatus = startDate.value < endDate.value ? true : false,
        descriptionStatus = description.value.length == 0 ? false : true

    if (projectNameStatus && clientNameStatus && projectManagerStatus && descriptionStatus && dateStatus) {
        const projectDetails = {
            projectName: projectName.value,
            clientName: clientName.value,
            projectManager: projectManager.value,
            projectStatus: 'Open',
            startDate: startDate.value,
            endDate: endDate.value,
            progress: progress.value || 0,
            technologies: technologies.value,
            description: description.value,
            technologies: technologies.value.split(',')
        }

        console.log(projectDetails)

        if(addProjectFunction) {
            // Add new project.
            projects.projectList.push(projectDetails);
            resources[projects.projectList.length] = [];
        } else {
            // Update already existing project.
            projects.projectList[selectedProjectId] = projectDetails;
        }
        put(urlList.projects, secretKey, projects, printResult);
    } // Display error messages
    else {
        if (!projectNameStatus) errorMessages(projectName, "#pname-error", "This field cannot be empty")
        if (!clientNameStatus) errorMessages(clientName, "#cname-error", "This field cannot be empty")
        if (!projectManagerStatus) {
            if (projectManager.value.length == 0) errorMessages(projectManager, "#pmname-error", "This field cannot be empty")
            else errorMessages(projectManager, "#pmname-error", "Only alphabets and spaces are allowed")
        }
        if (!dateStatus) errorMessages(endDate, "#dates-error", "Enter a valid end date")
        if (!descriptionStatus) errorMessages(description, "#description-error", "This field cannot be empty")
    }
}

// Add new project event listener.
const addProject = document.querySelector('#new-project');
addProject.addEventListener('click', function (e) {
    e.preventDefault()

    formsContainer.style.display = "flex";
    projectFormModal.style.display = "block";

    // Hide progress slider
    document.getElementById("form-project-progress").style.display = "none";
    resourceFormModal.style.display = "none";
    deleteResourceConfirmationModal.style.display = "none";
});



// Update project details event listener.
const updateProject = document.querySelector('#project-headings--edit');
updateProject.addEventListener('click', function (e) {
    e.preventDefault()

    // Add project functionality set to false. (ie, update functionality is now true.)
    addProjectFunction = false;

    formsContainer.style.display = "flex";
    projectFormModal.style.display = "block";
    resourceFormModal.style.display = "none";
    deleteResourceConfirmationModal.style.display = "none";

    // Display slider and change button text
    document.getElementById("form-project-progress").style.display = "block";
    
    
    const projectName = document.querySelector('#project-name'),
        clientName = document.querySelector('#client-name'),
        projectManager = document.getElementById("project-manager"),
        startDate = document.querySelector('#start-date'),
        endDate = document.querySelector('#end-date'),
        technologies = document.querySelector('#technologies'),
        progress = document.getElementById("range"),
        progressLabel = document.querySelector('#progress-label'),
        description = document.getElementById("description"),
        formTitle = document.querySelector('#project-form--title'),
        submitButton = document.querySelector('#submit-project--button');

        // Change form heading and submit button text.
        const updateText = 'Update Project';
        formTitle.innerText = updateText;
        submitButton.value = updateText;

        // Set project name and client name as non-editable.
        projectName.readOnly = true;
        clientName.readOnly = true;

        // Identify currently active project and populate update form fields with existing values.
        selectedProject = projects.projectList[selectedProjectId];
        projectName.value = selectedProject.projectName;
        clientName.value = selectedProject.clientName;
        projectManager.value = selectedProject.projectManager;
        startDate.value = selectedProject.startDate;
        endDate.value = selectedProject.endDate;
        technologies.value = selectedProject.technologies.join(',');
        progress.value = selectedProject.progress;
        progressLabel.innerText = selectedProject.progress;
        description.value = selectedProject.description;
})

// Project form submit button event listener. It calls addOrUpdateProject().
const submitProjectForm = document.querySelector('#submit-project--button');
submitProjectForm.addEventListener('click', addOrUpdateProject);

// Pressing cancel on the project form will reload the page (to clear current form state) and set addProjectFunctionality to true.
const cancelProject = document.getElementById("cancel");
cancelProject.addEventListener('click', _ => {window.location.reload(); addProjectFunction = true;});
// Globally accessible variable to store whether function should add a new project or update an existing project.
let addProjectFunctionality = true;

// Function to add a new project or update an existing project as required.
function addOrUpdateProject() {
    // Store all required tags in variables.
    const projectName = document.querySelector('#project-name'),
        clientName = document.querySelector('#client-name'),
        projectManager = document.getElementById("project-manager"),
        projectManagerError = document.querySelector('#pmname-error'),
        startDate = document.querySelector('#start-date'),
        endDate = document.querySelector('#end-date'),
        technologies = document.querySelector('#technologies'),
        technologiesError = document.querySelector('#technologies-error'),
        progress = document.getElementById("range"),
        description = document.getElementById("description"),
        descriptionError = document.querySelector('#description-error');

    // Variables store validation of form input fields. 
    const validProjectName = validateProjectName(),
        validClientName = validateClientName(),
        validProjectManager = validatePersonName(projectManager, projectManagerError),
        validStartDate = validateStartDate(),
        validEndDate = validateEndDate(),
        validTechnologies = validateFieldNotEmpty(technologies, technologiesError),
        validDescription = validateFieldNotEmpty(description, descriptionError);

    // Check if all form input fields are valid.
    if (validProjectName && validClientName && validProjectManager && validStartDate && validEndDate && validTechnologies && validDescription) {
        const projectDetails = {
            projectId: projects.projectList.length,
            projectName: projectName.value,
            clientName: clientName.value,
            projectManager: projectManager.value,
            projectStatus: 'Open',
            startDate: startDate.value,
            endDate: endDate.value,
            progress: progress.value || 0,
            description: description.value,
            technologies: technologies.value.split(',')
        }
        if (addProjectFunctionality) {
            // Add new project.
            projects.projectList.push(projectDetails);
            resources[projects.projectList.length] = [];
        } else {
            // Update already existing project.
            projects.projectList[selectedProjectId] = projectDetails;
        }
        // Function call to update changes to remote storage bin.
        put(urlList.projects, secretKey, projects, printResult);
    }
}

// Add new project event listener.
const addProject = document.querySelector('#new-project');
addProject.addEventListener('click', function (e) {
    
    // Display add project form.
    formsContainer.style.display = "flex";
    projectFormModal.style.display = "block";
    resourceFormModal.style.display = "none";
    deleteResourceConfirmationModal.style.display = "none";

    // Hide progress slider while adding new project.
    document.getElementById("form-project-progress").style.display = "none";

    // const projectName = document.querySelector('#project-name'),
    //     clientName = document.querySelector('#client-name'),
    //     projectManager = document.getElementById("project-manager"),
    //     startDate = document.querySelector('#start-date'),
    //     endDate = document.querySelector('#end-date'),
    //     technologies = document.querySelector('#technologies'),
    //     progress = document.getElementById("range"),
    //     progressLabel = document.querySelector('#progress-label'),
    //     description = document.getElementById("description"),
    //     formTitle = document.querySelector('#project-form--title'),
    //     submitButton = document.querySelector('#submit-project--button');

    //     window.location.reload();

    //     const addText = 'Add Project';
    //     formTitle.innerText = addText;
    //     submitButton.value = addText;
    //     projectName.readOnly = false;
    //     clientName.readOnly = false;
    //     projectName.value = '';
    //     clientName.value = '';
    //     projectManager.value = '';
    //     startDate.value = '';
    //     endDate.value = '';
    //     technologies.value = '';
    //     progress.value = '';
    //     progressLabel.innerText = '';
    //     description.value = '';
});

// Update project details event listener.
const updateProject = document.querySelector('#project-headings--edit');
updateProject.addEventListener('click', function (e) {
    
    // Add project functionality set to false. (ie, update functionality is now true.)
    addProjectFunctionality = false;

    // Display update project details form
    formsContainer.style.display = "flex";
    projectFormModal.style.display = "block";
    resourceFormModal.style.display = "none";
    deleteResourceConfirmationModal.style.display = "none";
    
    // Display progress slider input
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
    startDate.value = selectedProject.startDate.split('-').reverse().join('-');
    endDate.value = selectedProject.endDate.split('-').reverse().join('-');
    technologies.value = selectedProject.technologies.join(',');
    progress.value = selectedProject.progress;
    progressLabel.innerText = selectedProject.progress;
    description.value = selectedProject.description;
});

// Project form submit button event listener. It calls addOrUpdateProject().
const submitProjectForm = document.querySelector('#submit-project--button');
submitProjectForm.addEventListener('click', addOrUpdateProject);

// Pressing cancel on the project form will reload the page (to clear current form state) and set addProjectFunctionality to true.
const cancelProject = document.getElementById("cancel");
cancelProject.addEventListener('click', _ => { window.location.reload(); addProjectFunctionality = true; });
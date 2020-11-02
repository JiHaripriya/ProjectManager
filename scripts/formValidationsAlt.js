const requiredFieldMessage = 'This is a required field.';
let addProjectFunction = true;
function addOrUpdateProject() {

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

    const validProjectName = validateProjectName(),
    validClientName = validateClientName(),
    validProjectManager = validatePersonName(projectManager, projectManagerError),
    validStartDate = validateStartDate(),
    validEndDate = validateEndDate(),
    validTechnologies = validateNotEmpty(technologies, technologiesError),
    validDescription = validateNotEmpty(description, descriptionError);

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
        if(addProjectFunction){
            projects.projectList.push(projectDetails);
        } else {
            projects.projectList[selectedProjectId] = projectDetails;
        }
        put(urlList.projects, secretKey, projects, printResult);
    }

}

const formsContainer = document.querySelector('#forms-modal');
const projectFormModal = document.querySelector('#modal-content-project');
const resourceFormModal = document.querySelector('#modal-content--resource');
const deleteResourceConfirmationModal = document.querySelector('#modal-content--delete-resource');

const addProject = document.querySelector('#new-project');
addProject.addEventListener('click', function (e) {
    
    formsContainer.style.display = "flex";
    projectFormModal.style.display = "block";
    // Hide progress slider
    document.getElementById("form-project-progress").style.display = "none";
    resourceFormModal.style.display = "none";
    deleteResourceConfirmationModal.style.display = "none";

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

const submitProjectForm = document.querySelector('#submit-project--button');
submitProjectForm.addEventListener('click', addOrUpdateProject);

const updateProject = document.querySelector('#project-headings--edit');
updateProject.addEventListener('click', function (e) {
    addProjectFunction = false;
    formsContainer.style.display = "flex";
    projectFormModal.style.display = "block";
    resourceFormModal.style.display = "none";
    // Display slider and change button text
    document.getElementById("form-project-progress").style.display = "block";
    deleteResourceConfirmationModal.style.display = "none";
    
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

        const updateText = 'Update Project';
        formTitle.innerText = updateText;
        submitButton.value = updateText;
        projectName.readOnly = true;
        clientName.readOnly = true;
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
})

//Updates error message based on messageContent value
//and returns obj value if there is no error otherwise returns false
let updateErrorMessage = (obj, errorMessage, errorMessageContent) => {
    if (errorMessageContent) {
        errorMessage.innerHTML = errorMessageContent;
        if (obj)
            obj.style.border = '1px solid #ff0000';
        return false;
    } else {
        errorMessage.innerHTML = '';
        obj.style.border = '1px solid #000000';
        return obj.value;
    }
}

function validateProjectName() {
    const projectName = document.querySelector('#project-name');
    const errorMessage = document.querySelector('#pname-error');
    const projectNameFormat = /^[A-Za-z0-9][A-Za-z0-9-.\s]*$/;
    let errorMessageContent = '';
    if(projectName.value === '') {
        errorMessageContent = 'This is a required field.';
    } else if(!projectName.value.match(projectNameFormat)){
        errorMessageContent = 'Please enter a valid project name.';
    }
    return updateErrorMessage(projectName, errorMessage, errorMessageContent);
}

function validateClientName() {
    const clientName = document.querySelector('#client-name');
    const errorMessage = document.querySelector('#cname-error');
    const clientNameFormat = /^[A-Za-z0-9][A-Za-z0-9-.\s]*$/;
    let errorMessageContent = '';
    if(clientName.value === '') {
        errorMessageContent = 'This is a required field.';
    } else if(!clientName.value.match(clientNameFormat)){
        errorMessageContent = 'Please enter a valid client name.';
    }
    return updateErrorMessage(clientName, errorMessage, errorMessageContent);
}

function validatePersonName(personNameObj, errorMessageObj) {
    const personName = personNameObj.value;
    const errorMessage = errorMessageObj;
    const nameFormat = /^[A-Za-z][A-Za-z\s.-]*$/;
    let errorMessageContent = '';
    if(personName === '') {
        errorMessageContent = 'This is a required field.';
    } else if(!personName.match(nameFormat)) {
        errorMessageContent = 'Please enter a valid name.';
    }
    return updateErrorMessage(personNameObj, errorMessage, errorMessageContent);
}

function validateStartDate() {
    const startDate = document.querySelector('#start-date');
    const errorMessage = document.querySelector('#start-date--error');
    const today = new Date();
    let errorMessageContent = '';
    if(startDate.value === '') {
        errorMessageContent = requiredFieldMessage;
    } else if(startDate.value < today) {
        errorMessageContent = 'Start date cannot be a past date.'
    }
    return updateErrorMessage(startDate, errorMessage, errorMessageContent);
}

function validateEndDate() {
    const startDate = document.querySelector('#start-date');
    const endDate = document.querySelector('#end-date');
    const errorMessage = document.querySelector('#end-date--error');
    let errorMessageContent = '';
    const today = new Date();
    if(endDate.value === '') {
        errorMessageContent = requiredFieldMessage;
    } else if(endDate.value <= startDate.value) {
        errorMessageContent = 'End date has to be greater than the start date.'
    }
    return updateErrorMessage(endDate, errorMessage, errorMessageContent);
}

function validateNotEmpty(obj, errorMessageObj){
    const objValue = obj.value;
    let errorMessageContent = '';
    if(objValue === '') {
        errorMessageContent = requiredFieldMessage;
    }
    return updateErrorMessage(obj, errorMessageObj, errorMessageContent);
}
const cancelProject = document.getElementById("cancel");
cancelProject.addEventListener('click', _ => {window.location.reload(); addProjectFunction = true;});

const cancelResource = document.getElementById("cancel-resource")
cancelResource.addEventListener('click', _ => formsContainer.style.display = "none")

const cancelDeleteResource = document.getElementById("cancel-delete-resource")
cancelDeleteResource.onclick = () => formsContainer.style.display = "none"
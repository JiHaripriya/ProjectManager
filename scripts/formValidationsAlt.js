// Error message to be displayed on required fields.
const requiredFieldMessage = 'This is a required field.';

// Variables to switch the visibility of different forms.
const formsContainer = document.querySelector('#forms-modal'),
    projectFormModal = document.querySelector('#modal-content-project'),
    resourceFormModal = document.querySelector('#modal-content--resource'),
    deleteResourceConfirmationModal = document.querySelector('#modal-content--delete-resource');

//Updates error message based on messageContent value
//and returns obj value if there is no error otherwise returns false.
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

// To check if a field is empty.
function validateFieldNotEmpty(obj, errorMessageObj) {
    const objValue = obj.value;
    let errorMessageContent = '';
    if (objValue === '') {
        errorMessageContent = requiredFieldMessage;
    }
    return updateErrorMessage(obj, errorMessageObj, errorMessageContent);
}


function validateProjectName() {
    const projectName = document.querySelector('#project-name');
    const errorMessage = document.querySelector('#pname-error');
    const projectNameFormat = /^[A-Za-z0-9][A-Za-z0-9-.\s]*$/;
    let errorMessageContent = '';
    if (projectName.value === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (!projectName.value.match(projectNameFormat)) {
        errorMessageContent = 'Please enter a valid project name.';
    }
    return updateErrorMessage(projectName, errorMessage, errorMessageContent);
}


function validateClientName() {
    const clientName = document.querySelector('#client-name');
    const errorMessage = document.querySelector('#cname-error');
    const clientNameFormat = /^[A-Za-z0-9][A-Za-z0-9-.\s]*$/;
    let errorMessageContent = '';
    if (clientName.value === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (!clientName.value.match(clientNameFormat)) {
        errorMessageContent = 'Please enter a valid client name.';
    }
    return updateErrorMessage(clientName, errorMessage, errorMessageContent);
}


function validatePersonName(personNameObj, errorMessageObj) {
    const personName = personNameObj.value;
    const errorMessage = errorMessageObj;
    const nameFormat = /^[A-Za-z][A-Za-z\s.-]*$/;
    let errorMessageContent = '';
    if (personName === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (!personName.match(nameFormat)) {
        errorMessageContent = 'Please enter a valid name.';
    }
    return updateErrorMessage(personNameObj, errorMessage, errorMessageContent);
}


function validateStartDate() {
    const startDate = document.querySelector('#start-date');
    const errorMessage = document.querySelector('#start-date--error');
    const today = new Date();
    let errorMessageContent = '';
    if (startDate.value === '') {
        errorMessageContent = requiredFieldMessage;
    } 
    // Will be an issue when updating a project
    // else if (startDate.value < today) {
    //     errorMessageContent = 'Start date cannot be a past date.'
    // }
    return updateErrorMessage(startDate, errorMessage, errorMessageContent);
}


function validateEndDate() {
    const startDate = document.querySelector('#start-date');
    const endDate = document.querySelector('#end-date');
    const errorMessage = document.querySelector('#end-date--error');
    let errorMessageContent = '';
    const today = new Date();
    if (endDate.value === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (endDate.value <= startDate.value) {
        errorMessageContent = 'End date has to be greater than the start date.'
    }
    return updateErrorMessage(endDate, errorMessage, errorMessageContent);
}


const validateEmailId = (emailId, errorMessage) => {
    const emailPattern = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$", "g")
    errorMessageContent = '';
    if (emailId.value === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (!emailId.value.match(emailPattern)) {
        errorMessageContent = 'Please enter a valid email.';
    }
    return updateErrorMessage(emailId, errorMessage, errorMessageContent);
}


function validateResourceRole(resourceRole, errorMessage) {
    const resourceFormat = /^[A-Za-z\s-]+$/;
    errorMessageContent = '';
    if (resourceRole.value === '') {
        errorMessageContent = requiredFieldMessage;
    } else if (!resourceRole.value.match(resourceFormat)) {
        errorMessageContent = 'Please enter a valid role.';
    }
    return updateErrorMessage(resourceRole, errorMessage, errorMessageContent);
}


function validateRatePerHour(ratePerHour, errorMessage) {
    const rateFormat = /^\d*.?\d+$/;
    errorMessageContent = '';
    if (ratePerHour.value === '' && document.querySelector('#billable').checked) {
        errorMessageContent = requiredFieldMessage;
    } else if (!ratePerHour.value.match(rateFormat) || ratePerHour.value < 0) {
        errorMessageContent = 'Please enter a valid rate.';
    }
    return updateErrorMessage(ratePerHour, errorMessage, errorMessageContent);
}
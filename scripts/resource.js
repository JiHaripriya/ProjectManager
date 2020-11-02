// Globally accessible variable to store whether function should add a new resource or update an existing resource.
let addResourceFunctionality = true;

// Store in variables HTML tags that trigger add/edit/delete resource functionalities.
// Checking billable checkbox will display ratePerHour input field. 
const addResource = document.getElementById("add-resource-icon"),
    editResource = document.querySelectorAll('[data-editresourceid]'),
    deleteResource = document.querySelectorAll('[data-deleteresourceid]'),
    billable = document.getElementById("billable");


// Add resource event listener.
addResource.addEventListener('click', (e) => {
    // Display add resource form.
    formsContainer.style.display = "flex";
    document.getElementById("modal-content-project").style.display = "none";
    document.getElementById("modal-content--resource").style.display = "block";
    document.getElementById("modal-content--delete-resource").style.display = "none";

    //Set form title text and form submit button text.
    document.querySelector('#resource-form--title').innerText = 'Add Resource';
    document.querySelector('#resource-submit--button').innerText = 'Add Resource';
});

// Function to add or update resource.
function addOrUpdateResource() {
    // Store all required tags in variables.
    const resourceName = document.querySelector('#name'),
        resourceNameError = document.querySelector('#name-error'),
        emailId = document.querySelector('#email'),
        emailIdError = document.querySelector('#email-error'),
        resourceRole = document.querySelector('#role'),
        resourceRoleError = document.querySelector('#role-error'),
        billableCheckBox = document.querySelector('#billable'),
        ratePerHour = document.querySelector('#rate'),
        ratePerHourError = document.querySelector('#rate-error');

    // Variables store validation of form input fields. 
    const validResourceName = validatePersonName(resourceName, resourceNameError),
        validEmailId = validateEmailId(emailId, emailIdError),
        validResourceRole = validateResourceRole(resourceRole, resourceRoleError),
        validRatePerHour = validateRatePerHour(ratePerHour, ratePerHourError);

    // Check if all form input fields are valid.
    if (validResourceName && validEmailId && validResourceRole && billable.checked ? validRatePerHour : true) {
        const resourceDetails = {
            name: resourceName.value,
            role: resourceRole.value,
            email: emailId.value,
            billable: billable.checked,
            ratePerHour: billable.checked ? ratePerHour.value : 0
        }
        if (resources[selectedProjectId] === undefined) {
            resources[selectedProjectId] = [];
        }
        if (addResourceFunctionality) {
            // Add new resource.
            resources[selectedProjectId].push(resourceDetails);
        } else {
            // Update already existing resource.
            resources[selectedProjectId][selectedResource] = resourceDetails;
        }
        // Function call to update changes to remote storage bin.
        put(urlList.resources, secretKey, resources, printResult);
        loadResources();
    }
}

// Globally accessible variable to store currently selected resource for updation or deletion.
let selectedResource;

// Edit resource event listeners added to all resources.
for (let eachResource of editResource) {
    eachResource.addEventListener('click', (e) => {

        selectedResource = e.currentTarget.dataset.editresourceid;

        formsContainer.style.display = "flex";
        document.getElementById("modal-content-project").style.display = "none";
        document.getElementById("modal-content--resource").style.display = "block";
        document.getElementById("modal-content--delete-resource").style.display = "none";

        document.querySelector('#resource-form--title').innerText = 'Update Resource';
        document.querySelector('#resource-submit--button').value = 'Update Resource';

        addResourceFunctionality = false;

        const resourceName = document.querySelector('#name'),
            resourceNameError = document.querySelector('#name-error'),
            emailId = document.querySelector('#email'),
            emailIdError = document.querySelector('#email-error'),
            resourceRole = document.querySelector('#role'),
            resourceRoleError = document.querySelector('#role-error'),
            billableCheckBox = document.querySelector('#billable'),
            ratePerHour = document.querySelector('#rate'),
            ratePerHourError = document.querySelector('#rate-error');

        resourceList = resources[selectedProjectId];
        const resource = resourceList[selectedResource];
        resourceName.value = resource.name;
        emailId.value = resource.email;
        resourceRole.value = resource.role;
        billable.checked = resource.billable;

        document.querySelector('#rate-label').style.display = billable.checked ? 'flex' : 'none';
        ratePerHour.value = resource.ratePerHour;

        resourceName.readOnly = true;
        emailId.readOnly = true;
    });
}

const cancelResource = document.getElementById("cancel-resource");
cancelResource.addEventListener('click', _ => { window.location.reload(); addResourceFunctionality = true; });

const submitResourceForm = document.querySelector('#resource-submit--button');
submitResourceForm.addEventListener('click', addOrUpdateResource);

// Delete resource event listeners added to all resources.
for (let eachResource of deleteResource) {
    eachResource.addEventListener('click', (e) => {
        selectedResource = e.currentTarget.dataset.deleteresourceid;
        formsContainer.style.display = "flex"
        document.getElementById("modal-content-project").style.display = "none"
        document.getElementById("modal-content--resource").style.display = "none"
        document.getElementById("modal-content--delete-resource").style.display = "block"
    });
}

const cancelDeleteResource = document.getElementById("cancel-delete-resource");
cancelDeleteResource.onclick = () => formsContainer.style.display = "none";

const deleteResourceButton = document.querySelector('#delete-resource');
deleteResourceButton.addEventListener('click', function (e) {
    resources[selectedProjectId].splice(selectedResource, 1);
    put(urlList.resources, secretKey, resources, printResult);
    loadResources();
});

// Billable status
billable.addEventListener('click', (e) => {
    const status = billable.checked
    if (status) document.getElementById("rate-label").style.display = "flex"
    else document.getElementById("rate-label").style.display = "none"
});
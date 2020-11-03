// Globally accessible variable to store whether function should add a new resource or update an existing resource.
let addResourceFunctionality = true;

// Store in variables HTML tags that trigger add/edit/delete resource functionalities.
// Checking billable checkbox will display ratePerHour input field. 
const addResource = document.getElementById("add-resource-icon"),
    editResource = document.querySelectorAll('[data-editresourceid]'),
    deleteResource = document.querySelectorAll('[data-deleteresourceid]'),
    billable = document.getElementById("billable");

// Add resource event listener.
addResource.addEventListener('click', _ => {
    // Display add resource form.
    formsContainer.style.display = "flex";
    document.getElementById("modal-content-project").style.display = "none";
    document.getElementById("modal-content--resource").style.display = "block";
    document.getElementById("modal-content--delete-resource").style.display = "none";

    //Set form title text and form submit button text.
    document.querySelector('#resource-form--title').innerText = 'Add Resource';
    document.querySelector('#resource-submit--button').innerText = 'Add Resource';
});

const createResourceObject = (name, email, role, billable, rate) => {
    const resourceDetails = {
        resourceName: name,
        email: email,
        role: role,
        billable: billable,
        rate: rate
    }
    return resourceDetails
}

// Function to add or update resource.
function addOrUpdateResource(e) {

    e.preventDefault()

    const nameStatus = resourceName.value.length != 0 && RegExp.prototype.isAlpha(resourceName.value) ? true : false,
    emailStatus = email.value.length > 0 && emailPatternCheck(email.value) ? true : false
    roleStatus = role.value.length != 0 && RegExp.prototype.isAlpha(role.value) ? true : false,
    rateStatus = rate.value != "" && billableStatus.checked ? true : false

    if (nameStatus && emailStatus && roleStatus) {
        if (billableStatus.checked) { // Billable true
            if (rateStatus) {
                const resourceDetails = createResourceObject(resourceName.value, email.value, role.value, billableStatus.checked, Number(rate.value))
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
            // Rate field empty error
            else errorMessages(rate, "#rate-error", "Enter a valid amount")
        } // billable false
        else console.log(createResourceObject(resourceName.value, email.value, role.value, billableStatus.checked, 0))
    } // Name or email or role empty OR contains characters other than alphabets and spaces
    else {
        if (!nameStatus) resourceName.value.length == 0 ? errorMessages(resourceName, "#name-error", "This field cannot be empty") : (RegExp.prototype.isAlpha(resourceName.value) ? _ : errorMessages(resourceName, "#name-error", "Only alphabets and spaces are allowed"))
        if (!emailStatus)email.value.length == 0 ? errorMessages(email, "#email-error", "This field cannot be empty") : (emailPatternCheck(email.value) ? _ : errorMessages(email, "#email-error", "Invalid email address"))
        if (!roleStatus)role.value.length == 0 ? errorMessages(role, "#role-error", "This field cannot be empty") : (RegExp.prototype.isAlpha(role.value) ? _ : errorMessages(role, "#role-error", "Only alphabets and spaces are allowed"))
    }
}

// Globally accessible variable to store currently selected resource for updation or deletion.
let selectedResource;

// Edit resource event listeners added to all resources.
for (let eachResource of editResource) {
    eachResource.addEventListener('click', (e) => {
        
        e.preventDefault()
        selectedResource = e.currentTarget.dataset.editresourceid;

        formsContainer.style.display = "flex";
        document.getElementById("modal-content-project").style.display = "none";
        document.getElementById("modal-content--resource").style.display = "block";
        document.getElementById("modal-content--delete-resource").style.display = "none";

        document.querySelector('#resource-form--title').innerText = 'Update Resource';
        document.querySelector('#resource-submit--button').value = 'Update Resource';

        addResourceFunctionality = false;
        
        resourceList = resources[selectedProjectId];
        const resource = resourceList[selectedResource];
        resourceName.value = resource.resourceName;
        email.value = resource.email;
        role.value = resource.role;
        billableStatus.checked = resource.billable;
        document.querySelector('#rate-label').style.display = billableStatus.checked ? 'flex' : 'none';
        rate.value = resource.rate;

        resourceName.readOnly = true;
        email.readOnly = true;
    });
}

const cancelResource = document.getElementById("cancel-resource");
cancelResource.addEventListener('click', _ => { window.location.reload(); addResourceFunctionality = true; });

const submitResourceForm = document.querySelector('#resource-submit--button');
submitResourceForm.addEventListener('click', addOrUpdateResource);

// Delete resource event listeners added to all resources.
for (let eachResource of deleteResource) {
    eachResource.addEventListener('click', e => {
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
    ;
    resources[selectedProjectId].splice(selectedResource, 1);
    put(urlList.resources, secretKey, resources, printResult);
    loadResources();
});

// Billable status
billable.addEventListener('click', _ => {
    const status = billable.checked
    if (status) document.getElementById("rate-label").style.display = "flex"
    else document.getElementById("rate-label").style.display = "none"
});
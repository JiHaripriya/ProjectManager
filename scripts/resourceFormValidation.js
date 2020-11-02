const cancelResource = document.getElementById("cancel-resource")
cancelResource.addEventListener('click', _ => formsContainer.style.display = "none")

const cancelDeleteResource = document.getElementById("cancel-delete-resource")
cancelDeleteResource.onclick = () => formsContainer.style.display = "none"


const addResource = document.getElementById("add-resource-icon"),
    editResource = document.getElementsByClassName("edit-icon"),
    deleteResource = document.getElementsByClassName("delete-icon"),
    billable = document.getElementById("billable")


// Add Resource
addResource.addEventListener('click', _ => {
    formsContainer.style.display = "flex"
    document.getElementById("modal-content-project").style.display = "none"
    document.getElementById("modal-content--resource").style.display = "block"
    document.getElementById("modal-content--delete-resource").style.display = "none"
})

// Edit Resource
for (let eachResource of editResource) {
    eachResource.addEventListener('click', _ => {
        formsContainer.style.display = "flex"
        document.getElementById("modal-content-project").style.display = "none"
        document.getElementById("modal-content--resource").style.display = "block"
        document.getElementById("modal-content--delete-resource").style.display = "none"
    })
}

// Delete Resource
for (let eachResource of deleteResource) {
    eachResource.addEventListener('click', _ => {
        formsContainer.style.display = "flex"
        document.getElementById("modal-content-project").style.display = "none"
        document.getElementById("modal-content--resource").style.display = "none"
        document.getElementById("modal-content--delete-resource").style.display = "block"
    })
}

// Billable status
billable.addEventListener('click', _ => {
    const status = billable.checked
    if (status) document.getElementById("rate-label").style.display = "flex"
    else document.getElementById("rate-label").style.display = "none"
})
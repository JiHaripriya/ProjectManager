const urlList = {
    "projects": "https://api.jsonbin.io/b/5fa19223ce4aa22895553d4b",
    "resources": "https://api.jsonbin.io/b/5fa191f3a03d4a3bab0c3c67"
}
const secretKey = "$2b$10$ZqxlCvfg0KVF1GkqsbI29u8bwGG1jE7jdHujechv1B2EGDvA.a97q";

let get = function (url, secretKey, callback) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            callback(JSON.parse(req.responseText));
        }
    };

    req.open("GET", url, false);
    req.setRequestHeader("secret-key", secretKey);
    req.send();
}

// Prints whatever is passed to it.
function printResult(res) {
    console.log(res);
}

function storeProjectData(res) {
    projects = res;
}

function storeResourceData(res) {
    resources = res;
}

let put = function (url, secretKey, obj, callback) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(JSON.parse(req.responseText));
            callback(JSON.parse(req.responseText));
        }
    };

    req.open("PUT", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("secret-key", secretKey);
    req.setRequestHeader("versioning", false);
    req.send(JSON.stringify(obj));
}

//Check whether input has only alphabets
RegExp.prototype.isAlpha = function (input) { return /^[A-Za-z ]*$/.test(input) }

// Function to create circular progress bar. 
function createProgressBar(percent, main = false) {
    const progressBar = document.createElement('span');
    progressBar.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${percent}%, var(--light-blue) 1%)`;
    const progressPercent = createSpanTag(`${percent}%`);
    if (main === true) {
        progressBar.classList.add('circular--main', 'display-flex', 'flex-center');
        progressPercent.classList.add('inner--main', 'display-flex', 'flex-center');
    } else {
        progressBar.classList.add('circular', 'display-flex', 'flex-center');
        progressPercent.classList.add('inner', 'display-flex', 'flex-center');
    }
    progressBar.appendChild(progressPercent);
    return progressBar;
}

// Creates span tag, adds its innerText, and returns the tag.
function createSpanTag(text) {
    const spanTag = document.createElement('span');
    spanTag.innerText = text;
    return spanTag;
}

// Creates table cell (td tag), stores its innerText, right aligns numeric content, and returns cell.
function createTableCell(value) {
    const cell = document.createElement('td');
    cell.innerText = value;
    console.log(value, typeof(value))
    if (typeof (value) === 'number') {
        cell.style.textAlign = 'right';
    }
    return cell;
}

// Creates table cell with edit/delete button and returns cell.
function createButtonCell(buttonCollection) {
    const cell = document.createElement('td');
    cell.classList.add('remove-background');
    buttonCollection.forEach(button => {
        if( button.buttonType === 'edit' ) {
            [src, alt, classListArray, attributeName, attributeValue] = ['images/edit.png', 'Pen icon', ['table-icons', 'edit-icon', 'margin-right10'], button.attribute, button.row]
            const tableButton = createImageTag(src, alt, classListArray)
            tableButton.setAttribute(attributeName, attributeValue)
            tableButton.addEventListener('click', function(e) {displayEditResourceForm(e);});
            cell.appendChild(tableButton)
        }
        else {
            [src, alt, classListArray, attributeName, attributeValue] = ['images/delete-icon.png', 'Trash bin icon', ['table-icons', 'delete-icon'], button.attribute, button.row];
            const tableButton = createImageTag(src, alt, classListArray)
            tableButton.setAttribute(attributeName, attributeValue)
            tableButton.addEventListener('click', function(e) { displayDeleteResourceModal(e);});
            cell.appendChild(tableButton)
        }
        
    })
    return cell;
}

// Creates and returns image tag with src, alt, and classes added to it.
function createImageTag(src, alt, classListArray) {
    const imageTag = document.createElement('img');
    imageTag.src = src;
    imageTag.alt = alt;
    classListArray.forEach(className => {
        imageTag.classList.add(className);
    });
    return imageTag;
}

//Function to remove all child nodes of parent node.
function removeChildNodes(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}
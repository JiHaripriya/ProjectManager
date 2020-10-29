// Add new project 
const newProject = document.getElementById("new-project")
newProject.addEventListener('click', (event) => {
    modal.style.display = "flex"
})

// Add new project form
const modal = document.getElementById("new-project-modal");
const span = document.getElementById("close");
span.onclick = () => modal.style.display = "none";

// TOGGLE PROJECT
// const project1Name = document.getElementById("project-1"), project2Name = document.getElementById("project-2"),
// project1 = document.getElementById("project-1--content"), project2 = document.getElementById("project-2--content")

// project1Name.addEventListener('click', e => {
//     project1.style.display = "block"
//     project2.style.display = "none"
// })

// project2Name.addEventListener('click', e => {
//     project2.style.display = "block"
//     project1.style.display = "none"
// })

// Horizontal scroll of tabs
(function() {
    function scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.getElementById('project-headings--main').scrollLeft -= (delta * 40);
        e.preventDefault();
    }
    if (document.getElementById('project-headings--main').addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.getElementById('project-headings--main').addEventListener('mousewheel', scrollHorizontally, false);
        // Firefox
        document.getElementById('project-headings--main').addEventListener('DOMMouseScroll', scrollHorizontally, false);
    } else {
        // IE 6/7/8
        document.getElementById('project-headings--main').attachEvent('onmousewheel', scrollHorizontally);
    }
})();

// Get progress bar
const progressBar = document.getElementById("progress-bar"),
progressPercent = document.getElementById("progress-percent"),
progressBarMain = document.getElementById("progress-bar-main"),
progressPercentMain = document.getElementById("progress-percent-main"),
percent = 50
progressPercent.innerText = percent + "%"
progressPercentMain.innerText = percent + " %"
progressBar.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${percent}%, var(--light-blue) 1%)`
progressBarMain.style.backgroundImage = `linear-gradient(to top, var(--dark-blue) ${percent}%, var(--light-blue) 1%)`

// Tabbed View related functionailities
const detailsTab = document.getElementById("project-headings--details"), 
resourceTab = document.getElementById("project-headings--resources"),
invoiceTab = document.getElementById("project-headings--invoice"),
tabHeight =  document.getElementById("project-details-tab").offsetHeight,
resourceBody = document.getElementById("resource"),
invoiceBody = document.getElementById("invoice"),
projectList = document.getElementById("project-list")

// Set height of each tab
const setHeight = (tab, limit, height) => {
    if(limit == "minimum") tab.style.minHeight = `${height}px`
    else tab.style.maxHeight = `${height + detailsTab.offsetHeight - 8}px`
}


setHeight(document.getElementById("project-details-tab"), "minimum", tabHeight)
setHeight(resourceBody, "minimum", tabHeight)
setHeight(invoiceBody, "minimum", tabHeight)
setHeight(projectList, "maximum", tabHeight)

headingId = ["project-details-tab", "resource", "invoice"]

const setVisibility = (id, propertyValue) => {
    let currentTab = document.getElementById(id)
    currentTab.style.display = propertyValue

    // Set visibility and color for other tabs
    headingId.filter(item => item != id).forEach (
        eachTab => {
            currentTab = document.getElementById(eachTab)
            currentTab.style.display = "none"
            // Toggle color for each tab (Details, Resources and Invoice)
            if(currentTab.id.toLowerCase().includes("detail")){ detailsTab.style.backgroundColor = "rgb(227, 235, 255)"}
            if(currentTab.id.toLowerCase().includes("resource")){ resourceTab.style.backgroundColor = "rgb(227, 235, 255)"}
            if(currentTab.id.toLowerCase().includes("invoice")){ invoiceTab.style.backgroundColor = "rgb(227, 235, 255)"}
        }
    )
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



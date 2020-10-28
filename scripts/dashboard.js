// Add new project 
const newProject = document.getElementById("new-project")
newProject.addEventListener('click', (event) => {
    modal.style.display = "flex"
})

// Add new project form
const modal = document.getElementById("new-project-modal");
const span = document.getElementById("close");
span.onclick = () => modal.style.display = "none";

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
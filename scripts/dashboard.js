let modal = document.getElementById("myModal");
const newProject = document.getElementById("new-project")

newProject.addEventListener('click', event => {
    modal.style.display = "flex"
})

var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
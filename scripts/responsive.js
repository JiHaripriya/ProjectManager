const navSlide = () => {
    const burger = document.querySelector(".hamburger")
    const nav = document.querySelector(".options")
    burger.addEventListener('click', _ => nav.classList.toggle('options-active'))
}

navSlide()
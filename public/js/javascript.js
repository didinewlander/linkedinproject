/* Modal Control Functionality */

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById("overlay");

openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        const parent = button.parentElement;
        const title = parent.querySelector('[card-title]').innerText;
        console.log(title);
        openModal(modal, title);
    })
})
if (overlay) {

    overlay.addEventListener("click", () => {
        console.log("almost closing");

        const modals = document.querySelectorAll('.pop-up-window.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
    })
}
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.pop-up-window')
        closeModal(modal)
    })
})

function openModal(modal, title) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
    let modalTitle = document.querySelector('[modal-title]');
    modalTitle.textContent = title;
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

/* Search Control Functionality */

const resultTemplate = document.querySelector('[data-result-template]');
const resultContainer = document.querySelector("[data-result-container]")
const searchInput = document.querySelector("[data-search]");

let showResults = true;
let results = [];


searchInput.addEventListener("input", e => {
    const value = e.target.value;
    value ? resultContainer.classList.toggle("hide", !showResults) : resultContainer.classList.toggle("hide", showResults);
    const hebrewRegex = /^[\u0590-\u05FF\s"'`]+$/;
    if (hebrewRegex.test(value)) {
        results.forEach(result => {

            const isVisible = result.name.includes(value);
            result.element.classList.toggle("hide", !isVisible);
        })

    }
})

fetch("/jsontest")
    .then(res => res.json())
    .then(data => {

        results = data.map(result => {
            resultContainer.classList.toggle("hide", showResults);
            const resultView = resultTemplate.content.cloneNode(true).children[0];
            const resultHeader = resultView.querySelector('[result-header]');
            const resultBody = resultView.querySelector('[result-body]');
            resultHeader.textContent = result.name;
            resultBody.innerHTML = `<a href="/search/${result.name}">שיעורים של ${result.name}</a>`;
            resultContainer.append(resultView);

            return { name: result.name, email: result.email, element: resultView };
        })
    });
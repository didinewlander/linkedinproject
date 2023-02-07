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

overlay.addEventListener("click", () => {
    console.log("almost closing");

    const modals = document.querySelectorAll('.pop-up-window.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})
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
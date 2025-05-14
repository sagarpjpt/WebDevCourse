let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');

// when click on shared button open the share page
function openModal() {
    console.log('open the share page')
    overlay.style.opacity = 1;
    overlay.style.zIndex = 5;
    modal.style.scale = 1;
}

//when click on any where on screen close the share page
function closeModal() {
    console.log('share page closed')
    overlay.style.opacity = 0;
    overlay.style.zIndex = -1;
    modal.style.scale = 0;
}
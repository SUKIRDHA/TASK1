// Pha5e animation
const letters = document.querySelectorAll('.letter');
letters.forEach(letter => {
    letter.style.opacity = 1;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    text.setAttribute("x", "50%");
    text.setAttribute("y", "50%");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.textContent = letter.textContent;

    path.setAttribute("d", `M10 80 _ 95 10 180 80`);
    path.setAttribute("class", "letterPath");

    svg.appendChild(path);
    svg.appendChild(text);
    letter.innerHTML = '';
    letter.appendChild(svg);
});

// Hide animation and show content
setTimeout(() => {
    document.querySelector('.pha5e-container').style.display = 'none';
    const contentContainer = document.querySelector('.content-container');
    contentContainer.style.display = 'flex';
    setTimeout(() => {
        contentContainer.style.opacity = 1;
    }, 100);
}, 7000); 
// Function to reveal content and apply grayscale effect to other images
function revealContent(selectedImage) {
    const images = document.querySelectorAll('.interactive-image');
    const texts = document.querySelectorAll('.card-text');
    images.forEach(image => {
        if (image !== selectedImage.querySelector('.interactive-image')) {
            image.style.filter = 'grayscale(100%)'; // Apply grayscale to other images
        } else {
            image.style.filter = 'none'; // Keep the selected image in original color
        }
    });
    texts.forEach(text => {
        if (text !== selectedImage.querySelector('.card-text')) {
            text.style.filter = 'grayscale(100%)'; // Apply grayscale to other texts
        } else {
            text.style.filter = 'none'; // Keep the selected text in original color
        }
    });
}

// Interactive image effects
const interactiveImages = document.querySelectorAll('.interactive-image');

interactiveImages.forEach(image => {
    image.addEventListener('mouseover', () => {
        revealContent(image.parentElement); // Apply grayscale effect on hover
    });

    image.addEventListener('mouseout', () => {
        interactiveImages.forEach(img => img.style.filter = 'none'); // Remove grayscale effect when not hovering
        document.querySelectorAll('.card-text').forEach(text => text.style.filter = 'none'); // Remove grayscale effect from texts
    });

    image.addEventListener('mousemove', (event) => {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        image.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.1)`;
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = `translate(0, 0) scale(1)`;
    });
});

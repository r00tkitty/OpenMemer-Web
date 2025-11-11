// const canvas = document.getElementById('memeEditor'); already declared in core.js
// const fileInput = document.getElementById('imageLoader'); already declared in core.js
const topText = document.getElementById('topText'); // top text input
const bottomText = document.getElementById('bottomText'); // bottom text 
const fontSizeInput = document.getElementById('fontSizeValue'); // font size input
const outlineWidthInput = document.getElementById('strokeValue'); // outline width input
fontSizeInput.addEventListener('change', drawMeme); // redraw meme on font size change
outlineWidthInput.addEventListener('change', drawMeme); // redraw meme on outline width change
topText.addEventListener('input', drawMeme);
bottomText.addEventListener('input', drawMeme);
let fontPercent = 8;
let strokePercent = 2;

document.getElementById("fontSizePlus").addEventListener("click", () => {
    fontPercent += 1;
    fontSizeValue.textContent = fontPercent + "%";
    drawMeme();
});

document.getElementById("fontSizeMinus").addEventListener("click", () => {
    if (fontPercent > 1) fontPercent -= 1;
    fontSizeValue.textContent = fontPercent + "%";
    drawMeme();
});

document.getElementById("strokePlus").addEventListener("click", () => {
    strokePercent += 1;
    outlineWidthInput.value = strokePercent;
    drawMeme();
});

document.getElementById("strokeMinus").addEventListener("click", () => {
    if (strokePercent > 1) strokePercent -= 1;
    outlineWidthInput.value = strokePercent;
    drawMeme();
}); 

canvas.addEventListener('click', () => { // if user clicks the canvas
    fileInput.click(); // trigger file input click on canvas click
});

const advancedSettingsBtn = document.getElementById('advBtn'); // advanced settings button
const advancedSettingsHandler = document.getElementById('advancedSettingsHandler'); // advanced settings handler
advancedSettingsBtn.addEventListener('click', () => {
    const isVisible = advancedSettingsHandler.classList.toggle('visible');
    document.body.classList.toggle('adv-open', isVisible);

});

const inputs = document.querySelectorAll('.textInput');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('active');
    });

    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('active');
    });
});

    
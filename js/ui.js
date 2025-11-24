// const canvas = document.getElementById('memeEditor'); already declared in core.js
// const fileInput = document.getElementById('imageLoader'); already declared in core.js
const topText = document.getElementById('topText'); // top text input
const bottomText = document.getElementById('bottomText'); // bottom text 
const fontSizeInput = document.getElementById('fontSize'); // font size input
const outlineWidthInput = document.getElementById('outlineWidth'); // outline width input
fontSizeInput.addEventListener('change', drawMeme); // redraw meme on font size change
outlineWidthInput.addEventListener('change', drawMeme); // redraw meme on outline width change
topText.addEventListener('input', drawMeme);
bottomText.addEventListener('input', drawMeme);


canvas.addEventListener('click', () => { // if user clicks the canvas
    fileInput.click(); // trigger file input click on canvas click
});

const advancedSettingsBtn = document.getElementById('advBtn'); // advanced settings button
const advancedSettingsHandler = document.getElementById('advancedSettingsHandler'); // advanced settings handler
advancedSettingsBtn.addEventListener('click', () => {
    const isVisible = advancedSettingsHandler.classList.toggle('visible');
    document.body.classList.toggle('adv-open', isVisible);

});

// Handle pill controls
document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (!input) return;
        
        const step = parseFloat(input.step) || 1;
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);
        let val = parseFloat(input.value);

        if (btn.classList.contains('decrement')) {
            val -= step;
        } else {
            val += step;
        }

        // Clamp value
        if (!isNaN(min) && val < min) val = min;
        if (!isNaN(max) && val > max) val = max;

        // Round to avoid floating point errors
        val = Math.round(val * 100) / 100;

        input.value = val;
        
        // Trigger change event manually so drawMeme picks it up
        input.dispatchEvent(new Event('change'));
    });
});

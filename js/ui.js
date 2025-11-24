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

// Mobile keyboard handling
const inputs = [topText, bottomText];
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        document.body.classList.add('keyboard-open');
        input.classList.add('active-input');
    });
    input.addEventListener('blur', () => {
        document.body.classList.remove('keyboard-open');
        input.classList.remove('active-input');
    });
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

// Handle Android "Back" button closing keyboard without blurring
if (window.visualViewport) {
    let viewportBaseHeight = window.visualViewport.height;
    let isKeyboardLikelyOpen = false;
    
    window.visualViewport.addEventListener('resize', () => {
        const currentHeight = window.visualViewport.height;

        // Update base height if the new height is larger (e.g. keyboard closed or browser bars hid)
        if (currentHeight > viewportBaseHeight) {
            viewportBaseHeight = currentHeight;
        }

        // If height is significantly smaller than base, keyboard is open
        if (viewportBaseHeight - currentHeight > 150) {
            isKeyboardLikelyOpen = true;
        }

        // If the viewport height is close to the base height, the keyboard is likely closed
        if (Math.abs(viewportBaseHeight - currentHeight) < 50) {
            // Only blur if we knew the keyboard was open previously
            if (isKeyboardLikelyOpen && document.body.classList.contains('keyboard-open')) {
                if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
                    document.activeElement.blur();
                }
            }
            isKeyboardLikelyOpen = false;
        }
    });
}

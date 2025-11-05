const canvas = document.getElementById('memeEditor'); // get the canvas element
const ctx = canvas.getContext('2d'); // get 2D context for drawing
let image = new Image(); // create a new image object

const fileInput = document.getElementById('imageLoader'); // input element
fileInput.addEventListener('change', handleImage) // listen for file input changes
function handleImage() {
    const file = fileInput.files[0]; // get the selected file
    if (!file) return; // exit if no file is selected
    const url = URL.createObjectURL(file); // create a URL for the file
    image.src = url; // set the image source to the file URL

    image.onload = function () {
        /* 
        IMAGE SIZE LIMITS
        Minimum: 128x128
        Maximum: 4000x4000
        I'll think of better numbers for these later.
        Can't be assed right now.
         */

        if (image.width < 128 || image.height < 128) { // minimum size check
            alert("Image too small. Try something bigger. (Min 128x128)");
            return;
        }
        if (image.width > 4000 || image.height > 4000) { // maximum size check
            alert("Image too large. Try something smaller. (Max 4000x4000)");
            return;
        }
        /*
        Handling image loading and drawing to canvas
        0. Log image loaded
        1. Clear the canvas
        2. Calculate scaling to fit image within canvas
        3. Adjust canvas height to maintain aspect ratio
        4. Draw the image on the canvas
        */

        // draw the image on the canvas when it loads
        console.log("Image loaded!");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
        // calculate scaling to fit image within canvas
        const scale = canvas.width / image.width;
        const scaledHeight = image.height * scale;
        const x = 0; // x position to draw
        let y = 0; // y position to draw
        canvas.height = scaledHeight; // adjust canvas height to maintain aspect ratio

        ctx.drawImage(image, x, y, image.width * scale, scaledHeight); // draw the image


        /*
        Textbox setup will go here later
        */
        const text = "TOP TEXT"; // placeholder text
        const fontSize = canvas.width * 0.08; // font size
        ctx.font = `${fontSize}px IMPACT, Anton, sans-serif`; // set font
        ctx.fillStyle = 'white'; // text color
        ctx.strokeStyle = 'black'; // outline color
        ctx.lineWidth = fontSize * 0.1; // outline width
        ctx.textAlign = 'center'; // center align text

        ctx.fillText(text, canvas.width / 2, fontSize); // draw filled text
        ctx.strokeText(text, canvas.width / 2, fontSize); // draw text outline
    };
}
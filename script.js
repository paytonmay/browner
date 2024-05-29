const upload = document.getElementById('upload');
const overlaySelect = document.getElementById('overlay');
const blendModeSelect = document.getElementById('blendMode');
const applyButton = document.getElementById('apply');
const downloadButton = document.getElementById('download');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const overlays = {
    plain: 'public/plain.png',
    smothered: 'public/smothered.png',
    covered: 'public/covered.png',
    peppered: 'public/peppered.png',
    chunked: 'public/chunked.png',
    capped: 'public/capped.png',
    topped: 'public/topped.png',
    country: 'public/country.png',
    allTheWay: 'public/alltheway.png'
};

let baseImage = null;

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        baseImage = new Image();
        baseImage.crossOrigin = "Anonymous"; // Set crossOrigin attribute
        baseImage.src = e.target.result;
        baseImage.onload = () => {
            canvas.width = baseImage.width;
            canvas.height = baseImage.height;
            ctx.drawImage(baseImage, 0, 0);
        };
    };
    reader.readAsDataURL(file);
});

applyButton.addEventListener('click', () => {
    if (!baseImage) return;
    
    const overlay = new Image();
    overlay.crossOrigin = "Anonymous"; // Set crossOrigin attribute
    overlay.src = overlays[overlaySelect.value];
    overlay.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImage, 0, 0);
        ctx.globalCompositeOperation = blendModeSelect.value;
        ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
    };
});

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'hashbrown-meme.png';
    link.href = canvas.toDataURL();
    link.click();
});

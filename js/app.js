var grids = [
    [
        [9, "yellow"],
        [9, "yellow"],
    ],
    [
        [3, "white"],
        [3, "white"],
    ],
];

document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    prepareFileUpload();
});

function prepareFileUpload() {
    document.getElementById('imagecontainer').style.display = 'none';
    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // const img = document.getElementById('imageDisplay');
                // img.src = e.target.result;
                // img.style.display = 'block';
                drawUploadedFileToCanvas(e);
            }
            reader.readAsDataURL(file);
            document.getElementById('imagecontainer').style.display = 'block';
            document.getElementById('uploadcontainer').style.display = 'none';
        }
    });
}

function drawUploadedFileToCanvas(file) {
    const canvas = document.getElementById('imagecanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        drawGrid(canvas);
    }
    img.src = file.target.result;
}

function drawGrid(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    for(let i = 0; i < grids.length; i++) {
        const grid = grids[i];
        const gridWidth = width / grid[0][0];
        const gridHeight = height / grid[1][0];
        ctx.strokeStyle = grid[0][1];
        for (let x = 0; x < width; x += gridWidth) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        ctx.strokeStyle = grid[1][1];
        for (let y = 0; y < height; y += gridHeight) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }
}
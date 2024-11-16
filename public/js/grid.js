"use strict";
function drawGrid(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    for (let i = 0; i < grids.length; i++) {
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

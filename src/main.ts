import App from './app.js';
console.log('main.ts loaded');
document.addEventListener('DOMContentLoaded', () => {
    let uiContainer = document.getElementById('uicontainer');
    const app = new App(uiContainer!);
    console.log('App initialized');
});
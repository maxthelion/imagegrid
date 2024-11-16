import App from "./app.js";

export default class Renderable {
    element: HTMLElement;
    app: App
    constructor(app: App) {
        this.app = app;
        this.element = document.createElement('div');
    }
}
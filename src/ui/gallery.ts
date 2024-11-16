import App from "../app";
import Renderable from "../renderable.js";

export default class Gallery extends Renderable {
    thumbnailList: HTMLElement;
    constructor(app: App) {
        super(app);
        console.log('Gallery initialized');
        this.thumbnailList = document.createElement('div');
        this.element.appendChild(this.thumbnailList);
        this.loadImages();
    }

    loadImages() {
        console.log('Loading images');
        const transaction = this.app.imagedb.transaction(['images'], 'readonly');
        const store = transaction.objectStore('images');
        const request = store.getAll();
        let myApp = this.app;
        request.onsuccess = function(event) {
            const images = event.target.result;
            this.thumbnailList.innerHTML = '';
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = image.thumbnailData;
                img.dataset.id = image.id;
                img.addEventListener('click', function() {
                    // selectedImage.src = image.imageData;
                    myApp.viewImage(image.id);
                });
                this.thumbnailList.appendChild(img);
            });
        }.bind(this);
    }
}
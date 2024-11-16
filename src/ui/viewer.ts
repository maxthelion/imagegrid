import App from '../app.js';
import Renderable from '../renderable.js';

export default class Viewer extends Renderable {
    constructor(app: App) {
        super(app);
        console.log('Viewer initialized');
        this.element.innerHTML = '';
        let imageHolder = document.createElement('div');
        imageHolder.id = 'imageholder';
        this.element.appendChild(imageHolder);
        let viewedimage = document.createElement('img');
        viewedimage.id = 'viewedimage';
        imageHolder.appendChild(viewedimage);

        let imageID = this.app.getCurrentImageId()
        console.log(imageID)
        const transaction = this.app.imagedb.transaction(['images'], 'readonly');
        const store = transaction.objectStore('images');

        const request = store.get(parseInt(imageID!));
        request.onsuccess = function(event) {
            const image = event.target.result;
            viewedimage.src = image.imageData;
        }
        
    }
}
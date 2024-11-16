import Gallery from './ui/gallery.js';
import Uploader from './ui/uploader.js';
import Viewer from './ui/viewer.js';

type UIMode = "uploader" | "editor" | "viewer" | "gallery";
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


export default class App {
    rootElement: HTMLElement;
    imagedb: any;
    constructor(uiContainer: HTMLElement) {
        this.rootElement = uiContainer;
        let app = this;

        document.getElementById('gallery-link')?.addEventListener('click', () => {
            this.setMode('gallery');
        })
        const dbRequest = indexedDB.open('imageDB', 1);

        dbRequest.onupgradeneeded = function(event) {
            const db = event.target.result;
            db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
        };

        dbRequest.onsuccess = function(event) {
            app.imagedb = event.target.result;
            app.setMode();
        }
    }

    setMode(mode: UIMode = "uploader") {
        switch (mode) {
            case "uploader":
                this.showUploader();
                break;
            case "editor":
                this.showEditor();
                break;
            case  "gallery":
                this.showGallery();
                break;
            case 'viewer':
                this.showViewer();
                break;
            default:
                throw new Error("Invalid mode");
        }
    }

    showUploader() {
        this.rootElement.innerHTML = "";
        let upLoader = new Uploader(this);
        this.rootElement.appendChild(upLoader.element);
    }

    showEditor() {
        this.rootElement.innerHTML = "Editor";
    }

    showGallery(){
        this.rootElement.innerHTML = "";
        let gallery = new Gallery(this);
        this.rootElement.appendChild(gallery.element);
    }

    showViewer() {
        this.rootElement.innerHTML = "";
        let viewer = new Viewer(this);
        this.rootElement.appendChild(viewer.element);
    }

    viewImage(imageID: string) {
        this.setCurrentImage(imageID);
        this.setMode('viewer');
    }

    setCurrentImage(imageID: string) {
        console.log('Setting current image', imageID);
        localStorage.setItem('currentImage', imageID);
    }

    getCurrentImageId() {
        return localStorage.getItem('currentImage');
    }

    saveImage(target: any){
        // this.setMode('viewer')
        const img = new Image();
        img.src = target.result;
        let app = this;
        img.onload = function() {
            // create a thumbnail
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = 100;
            canvas.height = 100;
            ctx.drawImage(img, 0, 0, 100, 100);
            const thumbnailDataUrl = canvas.toDataURL('image/jpeg');

            const transaction = app.imagedb.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            const addRequest = store.add({ imageData: target.result, thumbnailData: thumbnailDataUrl });

            addRequest.onsuccess = function(event) {
                console.log('Image saved', event.target.result);
                // store the id of the saved image
                app.viewImage(event.target.result);
                // this.setMode('viewer');
            }
        }
    }
}

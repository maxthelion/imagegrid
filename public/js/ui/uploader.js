import Renderable from '../renderable.js';
export default class Uploader extends Renderable {
    constructor(app) {
        super(app);
        this.element = document.createElement('div');
        this.element.id = 'uploadcontainer';
        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.id = 'fileInput';
        this.fileInput.accept = 'image/*';
        this.element.appendChild(this.fileInput);
        this.addBehaviour();
    }
    addBehaviour() {
        let app = this.app;
        this.fileInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // const img = document.getElementById('imageDisplay');
                    // img.src = e.target.result;
                    // img.style.display = 'block';
                    app.saveImage(e.target);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    drawUploadedFileToCanvas(file) {
        const canvas = document.getElementById('imagecanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            // this.drawGrid(canvas);
        };
        img.src = file.target.result;
    }
}
// function prepareFileUpload() {
//     document.getElementById('imagecontainer').style.display = 'none';
//     document.getElementById('fileInput').addEventListener('change', function(event) {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function(e) {
//                 // const img = document.getElementById('imageDisplay');
//                 // img.src = e.target.result;
//                 // img.style.display = 'block';
//                 drawUploadedFileToCanvas(e);
//             }
//             reader.readAsDataURL(file);
//             document.getElementById('imagecontainer').style.display = 'block';
//             document.getElementById('uploadcontainer').style.display = 'none';
//         }
//     });
// }
// function drawUploadedFileToCanvas(file) {
//     const canvas = document.getElementById('imagecanvas');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const ctx = canvas.getContext('2d');
//     const img = new Image();
//     img.onload = function() {
//         ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
//         drawGrid(canvas);
//     }
//     img.src = file.target.result;
// }
// const imageInput = document.getElementById('image-input');
// const thumbnailList = document.getElementById('thumbnail-list');
// const selectedImage = document.getElementById('selected-image');
// const dbRequest = indexedDB.open('imageDB', 1);
// dbRequest.onupgradeneeded = function(event) {
//     const db = event.target.result;
//     db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
// };
// dbRequest.onsuccess = function(event) {
//     const db = event.target.result;
//     imageInput.addEventListener('change', function(event) {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function(e) {
//                 const img = new Image();
//                 img.src = e.target.result;
//                 img.onload = function() {
//                     const canvas = document.createElement('canvas');
//                     const ctx = canvas.getContext('2d');
//                     canvas.width = 100;
//                     canvas.height = 100;
//                     ctx.drawImage(img, 0, 0, 100, 100);
//                     const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
//                     const transaction = db.transaction(['images'], 'readwrite');
//                     const store = transaction.objectStore('images');
//                     store.add({ imageData: e.target.result, thumbnailData: thumbnailDataUrl });
//                     transaction.oncomplete = function() {
//                         displayThumbnails();
//                     };
//                 };
//             };
//             reader.readAsDataURL(file);
//         }
//     });
//     
//     displayThumbnails();
// };

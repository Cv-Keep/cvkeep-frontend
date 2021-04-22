import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';
import { jsPDF } from "jspdf";

export default {
  generateImage (selector) {
    const element = document.querySelector(selector);
    element.classList.add('downloading-as-image');

    return new Promise(resolve => {
      toBlob(element)
        .then(blob => {
          element.classList.remove('downloading-as-image');

          resolve(blob);
        });
    });
  },

  downloadPng (selector, filename) {
    return this.generateImage(selector)
      .then(blob => saveAs(blob, `${filename}.png`));
  },

  downloadPdf (selector, filename) {
    return new Promise(resolve => {
      this.generateImage(selector)
        .then(blob => {
          const img = Object.assign(document.createElement('img'), {
            src: URL.createObjectURL(blob),
          });

          img.onload = () => {
            const mm = px => Math.floor(px * 0.264583);
            const w = mm(img.width);
            const h = mm(img.height);
            const doc = new jsPDF('p', 'mm', [ w, h ], true);
            
            doc.addImage(img, 0, 0, w, h);
            doc.save(`${filename}.pdf`);
  
            resolve();
          } 
        }); 
    }) 
  }
}
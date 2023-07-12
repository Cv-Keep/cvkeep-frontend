import { saveAs } from 'file-saver';
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';

export default {
  generateImage (selector) {
    const element = document.querySelector(selector);
    element.classList.add('downloading-as-image');

    return new Promise(resolve => {
      domtoimage.toBlob(element)
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
          const imageDataURL = URL.createObjectURL(blob);
          const image = Object.assign(document.createElement('img'));

          image.onload = function() {
            let pageWidth = image.naturalWidth / 2;
            let pageHeight = image.naturalHeight / 2;
        
            // Create a new PDF with the same dimensions as the image.
            const pdf = new jsPDF({
              unit: "px",
              format: [pageHeight, pageWidth]
            });
        
            // Add the image to the PDF with dimensions equal to the internal dimensions of the page.
            pdf.addImage(imageDataURL, 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), '','FAST');
        
            // Save the PDF with the filename specified here:
            pdf.save(`${filename}.pdf`);
          } 
          
          image.src = imageDataURL;
          resolve(true);
        }); 
    }) 
  }
}
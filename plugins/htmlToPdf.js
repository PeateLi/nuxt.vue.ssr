import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
export default {
  install(Vue, options) {
    
    Vue.prototype.getPdf = function (title, isShowPreviewFullTime) {
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: false,
        useCORS: true,
        x: document.querySelectorAll('.el-row')[0].offsetLeft+document.querySelectorAll('.el-card')[0].offsetLeft,
        y: 30
      }).then(function (canvas) {
          let pageWidth = document.querySelectorAll('.el-card')[0].offsetWidth
          let pageHeight = document.querySelectorAll('.el-card')[0].offsetHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', [pageWidth, pageHeight])
          PDF.addImage(pageData, 'JPEG', 0, 0, pageWidth, pageHeight)
          PDF.save(title + '.pdf')
        }
      )
    }
  }
}

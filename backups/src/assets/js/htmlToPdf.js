import html2Canvas from 'html2canvas'
import { getUrlBase64 } from './utils'
import JsPDF from 'jspdf'

/**
 * html转PDF 支持远程序图片
 * @param id 要被转pdfID
 * @param filename PDF保存名
 */
export function downLoadPDF (id, filename) {
  let imgUrl = []
  let imgArr = document.all(id).getElementsByTagName('img')
  for (let i = 0; i < imgArr.length; i++) {
    imgUrl.push(imgArr[i].getAttribute('src'))
    getUrlBase64(imgArr[i].getAttribute('src'), '', '', function (base) {
      imgArr[i].setAttribute('src', base)
    })
  }
  setTimeout(function () {
    html2Canvas(document.querySelector('#' + id), {
      allowTaint: true
    }).then(function (canvas) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageHeight = contentWidth / 592.28 * 841.89
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = 595.28
      let imgHeight = 592.28 / contentWidth * contentHeight
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
      let PDF = new JsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          if (leftHeight > 0) {
            PDF.addPage()
          }
        }
      }
      PDF.save(filename + '.pdf')
      // 还原图片地址
      for (let i = 0; i < imgArr.length; i++) {
        imgArr[i].setAttribute('src', imgUrl[i])
      }
    })
  }, 500)
}

export default class Drawable {
  constructor(options = {}) {
    // set image width hight
    // super();
    this.setSize(option);
  }

  setSize() {
    //
  }
}

// const PADDINGSIZE = 48 * 2;
// const FONTSIZE = 32 * 2;
// const LINEHEIGHT = 48 * 2;
//
// const apercu = new Font(
//   'apercu',
//   path.resolve(__dirname, '../../fonts/apercu_regular.ttf')
// );
//
// function getLines(context, text, maxWidth) {
//   var words = text.split(' ');
//   var lines = [];
//   var currentLine = words[0];
//
//   for (var i = 1; i < words.length; i++) {
//     var word = words[i];
//     var width = context.measureText(currentLine + ' ' + word).width;
//     if (width < maxWidth) {
//       currentLine += ' ' + word;
//     } else {
//       lines.push(currentLine);
//       currentLine = word;
//     }
//   }
//   lines.push(currentLine);
//   return lines;
// }
//
// function getSideMargin(text, canvasWidth, context) {
//   const { width } = context.measureText(text);
//   return (canvasWidth - width) / 2;
// }
//
// function getQuoteImages() {
//   return Promise.all(['begin', 'end'].map(s => getQuoteImage(s)));
// }
//
// function getQuoteImage(suffix = 'end') {
//   return new Promise((resolve, reject) => {
//     // const img = new Image();
//     // img.onload = () => resolve(img);
//     // img.onerror = reject;
//     // img.src = quotes[suffix];
//     resolve();
//   });
// }
//
// function createImage(quote, size, bgImage) {
//   const size2x = size.map(n => n * 2);
//   const canvas = new Canvas(...size2x);
//   const context = canvas.getContext('2d');
//
//   return getQuoteImages().then(() => {
//     context.addFont(apercu);
//     context.fillStyle = 'rgb(244, 125, 49)';
//     context.fillRect(0, 0, ...size2x);
//     context.textBaseline = 'top';
//     context.font = `normal normal ${FONTSIZE}px apercu`;
//     context.fillStyle = 'rgb(90, 97, 117)';
//     const lines = getLines(context, quote, size2x[0] - PADDINGSIZE * 2);
//     const startY = (size2x[1] - lines.length * LINEHEIGHT) / 2;
//     lines.forEach((line, i) => {
//       context.fillText(
//         line,
//         getSideMargin(line, size2x[0], context),
//         startY + LINEHEIGHT * i
//       );
//     });
//
//     return Promise.resolve(canvas.toBuffer());
//   });
// }

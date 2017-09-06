import Canvas from 'canvas';
import sizeOf from 'image-size';
const { loadImage } = Canvas;

export default class DrawableImage {
  constructor(img, styles = {}) {
    this._img = img;
    this._styles = styles;
  }

  loadImage() {
    return loadImage(this._img).then(image => {
      this._dimensions = sizeOf(this._img);
      this._image = image;
    });
  }

  getRatio(width, height) {
    return width / height;
  }

  getObjectFitDimensions(
    { width: canvasWidth, height: canvasHeight },
    objectFit
  ) {
    const { width, height } = this._dimensions;
    const isCover = objectFit === 'cover';
    const imageRatio = this.getRatio(width, height);
    const canvasRatio = this.getRatio(canvasWidth, canvasHeight);
    // contain is the cover algorithm flipped
    const shouldUseCanvasHeight = isCover
      ? canvasRatio < imageRatio
      : canvasRatio >= imageRatio;
    if (shouldUseCanvasHeight) {
      const adjustedHeight = canvasHeight;
      const adjustedWidth = canvasHeight * imageRatio;
      return {
        height: adjustedHeight,
        width: adjustedWidth,
        left: (adjustedWidth - canvasWidth) / 2 * -1,
        top: 0,
      };
    } else {
      const adjustedWidth = canvasWidth;
      const adjustedHeight = canvasWidth / imageRatio;
      return {
        height: adjustedHeight,
        width: adjustedWidth,
        top: (adjustedHeight - canvasHeight) / 2 * -1,
        left: 0,
      };
    }
  }

  getStyleProp(prop = '') {
    return this._styles[prop] || 0;
  }

  drawImage(context, canvasStyles) {
    const objectFit = this._styles.objectFit;
    let aligmentSpec;
    if (objectFit) {
      aligmentSpec = this.getObjectFitDimensions(canvasStyles, objectFit);
    } else {
      aligmentSpec = {
        top: this.getStyleProp('top'),
        left: this.getStyleProp('left'),
        width: this.getStyleProp('width') || this._dimensions.width,
        height: this.getStyleProp('height') || this._dimensions.height,
      };
    }
    context.drawImage(
      this._image,
      aligmentSpec.left,
      aligmentSpec.top,
      aligmentSpec.width,
      aligmentSpec.height
    );
  }

  draw(context, canvasStyles) {
    if (!this._image) {
      return this.loadImage(this._img).then(() => {
        this.drawImage(context, canvasStyles);
        return Promise.resolve();
      });
    }
    this.drawImage(context, canvasStyles);
  }
}

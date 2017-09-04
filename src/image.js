import Canvas from 'canvas';
const { loadImage } = Canvas;

export default class DrawableImage {
  constructor(img, styles = {}) {
    this._img = img;
    this._styles = styles;
  }

  loadImage() {
    return loadImage(this._img).then(image => {
      this._image = image;
    });
  }

  getStyleProp(prop = '') {
    return this._styles[prop] || 0;
  }

  draw(context) {
    if (!this._image) {
      return this.loadImage(this._img).then(() => {
        context.drawImage(
          this._image,
          this.getStyleProp('left'),
          this.getStyleProp('top')
        );
        return Promise.resolve();
      });
    }
    context.drawImage(this._img, 0, 0);
  }
}

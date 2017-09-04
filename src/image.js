export default class DrawableImage {
  constructor(img) {
    this._img = img;
  }

  draw(context, canvasStyles) {
    // TODO: implement the ability to move around image
    // also utilize things like cover or contain image
    context.drawImage(this._img, 0, 0);
  }
}

import Canvas from 'canvas';
const { createCanvas, registerFont } = Canvas;

export default class Drawable {
  constructor(options = {}) {
    this._children = [];
    this._options = options;
    this.createCanvas();
  }

  createCanvas() {
    const { width, height } = this._options;
    this._canvas = createCanvas(width, height);
    this._context = this._canvas.getContext('2d');
  }

  verifyChild(child) {
    const isObject = typeof child === 'object';
    if (!isObject) {
      console.warn(
        `Child passed to append has to be an object. Recieved ${typeof child}`
      );
      return false;
    }
    const canDraw = typeof child.draw === 'function';
    if (!canDraw) {
      console.warn(
        `Child passed to append must have a "draw" method. Recieved a ${typeof child.draw} for the "draw" method.`
      );
      return false;
    }
    return true;
  }

  append(element, options = {}) {
    const { lazy } = options;
    const elements = (Array.isArray(element) ? element : [element]).filter(
      this.verifyChild
    );
    this._children = this._children.concat(elements);
    console.log(this._children);
    if (lazy || !elements.length) return Promise.resolve();
    return this.draw();
  }

  addFont(family, path) {
    registerFont(path, { family });
    this.createCanvas(); // need to recreate canvas afte registering font
  }

  drawChild(child) {
    return () =>
      new Promise(resolve => {
        const ret = child.draw(this._context, this._options);
        const isPromise = ret && typeof ret.then === 'function';
        return isPromise ? ret.then(resolve) : resolve();
      });
  }

  // draw is async because of the promise wrapping
  draw() {
    const context = this._context;
    const { backgroundColor, width, height } = this._options;
    if (backgroundColor) {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);
    }
    return this._children
      .map(child => this.drawChild(child))
      .reduce((promise, draw) => {
        return promise.then(() => draw());
      }, Promise.resolve());
  }

  toBuffer() {
    return this._canvas.toBuffer();
  }

  toDataURL(...args) {
    return this._canvas.toDataURL(...args);
  }
}

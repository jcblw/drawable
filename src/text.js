export default class Text {
  constructor(text = '', styles = {}) {
    this._text = text;
    this._styles = styles;
  }

  // does wrapping of text
  getLines(context, maxWidth = 0) {
    var words = this._text.split(' ');
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = context.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  getMaxWidth(canvasWidth = 0) {
    const left = this.getStyleProp('left');
    const right = this.getStyleProp('right');
    return canvasWidth - right - left;
  }

  getStyleProp(prop = '') {
    return this._styles[prop] || 0;
  }

  getSideMargin(text, canvasWidth, context) {
    const align = this._styles.textAlign || 'left';
    switch (align) {
      case 'center': {
        const { width } = context.measureText(text);
        return (canvasWidth - width - this.getStyleProp('right')) / 2;
      }
      case 'right': {
        const { width } = context.measureText(text);
        return canvasWidth - this.getStyleProp('right') - width;
      }
      case 'left':
      default:
        return this.getStyleProp('left');
    }
  }

  draw(context, canvasStyles = {}) {
    const { width: canvasWidth } = canvasStyles;

    context.textBaseline = 'top';
    context.font = `normal normal ${this.getStyleProp('fontSize')}px ${this
      ._styles.fontFamily || 'sans-serif'}`;
    context.fillStyle = this._styles.color || '#222';

    const lines = this.getLines(context, this.getMaxWidth(canvasWidth));

    lines.forEach((line, i) => {
      const top =
        this.getStyleProp('top') + this.getStyleProp('lineHeight') * i;
      context.fillText(
        line,
        this.getSideMargin(line, canvasWidth, context),
        top
      );
    });
  }
}

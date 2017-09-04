const Drawable = require('../dist').default;
const fs = require('fs');
const path = require('path');

const drawable = new Drawable({
  width: 600,
  height: 600,
  backgroundColor: 'white',
});

drawable.addFont('Roboto', path.resolve(__dirname, './Roboto-Regular.ttf'));

const text = Drawable.text(
  'Just pause for a moment and leave everything else behind.',
  {
    textAlign: 'center',
    top: 75,
    left: 75,
    right: 75,
    fontSize: 50,
    lineHeight: 60,
    fontFamily: 'Roboto',
    color: 'white',
  }
);

const img = Drawable.image(path.resolve(__dirname, './pattern.png'), {
  top: 32,
  left: 32,
});

drawable.append([img, text]).then(() => {
  fs.writeFile(path.resolve(__dirname, 'test.png'), drawable.toBuffer(), () => {
    console.log('Done!');
  });
});

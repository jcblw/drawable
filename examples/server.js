const Drawable = require('../dist').default;
const fs = require('fs');
const path = require('path');

const drawable = new Drawable({ width: 500, height: 500 });

console.log(path.resolve(__dirname, './Roboto-Regular.ttf'));

drawable.addFont('Roboto', path.resolve(__dirname, './Roboto-Regular.ttf'));

const text = Drawable.text('hello world this is a program', {
  textAlign: 'center',
  top: 20,
  left: 20,
  right: 20,
  fontSize: 50,
  lineHeight: 60,
  fontFamily: 'Roboto',
});

drawable.append([text]).then(() => {
  fs.writeFile(path.resolve(__dirname, 'test.png'), drawable.toBuffer(), () => {
    console.log('Done!');
  });
});

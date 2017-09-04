const Drawable = require('../dist').default;
const fs = require('fs');
const path = require('path');

console.log(Drawable);

const drawable = new Drawable({ width: 500, height: 500 });

const text = Drawable.text('hello world this is a program', {
  textAlign: 'center',
  top: 20,
  left: 20,
  right: 20,
  fontSize: 50,
  lineHeight: 60,
});

drawable.append([text]).then(() => {
  fs.writeFile(path.resolve(__dirname, 'test.png'), drawable.toBuffer(), () => {
    console.log('Done!');
  });
});

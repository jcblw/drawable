# Drawable

A way to make styling canvas elements like text and images nicer. This lib uses `node-canvas`, please see instructions on [how to get this working](https://github.com/Automattic/node-canvas#installation) on your computer.

> This is currently in some flux, and currently only works on a node server

```
npm i drawable --save
```

## Usage

```javascript
import Drawable from 'drawable'

const drawable = new Drawable({ width: 200, height: 200, backgroundColor: 'white' });

drawable.addFont('../font/path.ttf', 'Fake font');

const image = Drawable.image('../../image/path', { top: 0, left: 0 });
const text = Drawable.text('foo bar', {
  textAlign: 'center',
  top: 20,
  left: 20,
  fontSize: 12,
  fontFamily: 'Fake font'
});

drawable.append([image, text]);

console.log(drawable.toBuffer());
```

## TODO

- make api work on both client and server
- solidify output methods `toBuffer` and `toDataURI`
- make a public way to expose canvas element ( for appending to DOM )
- make a few adapters to work with react and ember

# Drawable

Drawable is universal js lib that will allow you to create images server or client side with the same api.

```
npi i drawable --save
```

## Usage

```javascript
import Drawable from 'drawable'

const drawable = new Drawable({ width: 200, height: 200 });

drawable.addFont('../font/path');

const image = Drawable.image('../../image/path', { top: 0, left: 0 });
const text = Drawable.text('foo bar', {
  textAlign: 'center',
  top: 20,
  left: 20,
  fontSize: 12
});

drawable.append(image);
drawable.append(text);

text.style({ textAlign: 'left' });


```

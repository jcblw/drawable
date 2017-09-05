# Drawable

[![Build Status](https://travis-ci.org/jcblw/drawable.svg?branch=master)](https://travis-ci.org/jcblw/drawable)

A way to make styling canvas elements like text and images nicer. This lib uses [node-canvas](https://github.com/Automattic/node-canvas), please see instructions on [how to get this working](https://github.com/Automattic/node-canvas#installation) on your computer.

## Why

The idea is to create a somewhat familiar way to style a canvas element to leverage the ability to turn the canvas drawing into an image. Images are more sharable and if done correctly more printable as well :D. This lib leverages [node-canvas](https://github.com/Automattic/node-canvas) to be able to do this server side currently, but its goal is to eventually be universal for client and server technologies. That way you could render some awesome interactive charts and then potentially render them also into something like a Github README. Not quite there yet tho.

## Be careful

This is currently in some flux, and currently only works on a node server.

## Installation

```
npm i drawable --save
```

## Usage

Drawable is really just a canvas that is meant to use some CSS like syntax to be able to add text and images to a canvas.

### Creating a drawable

```javascript
import Drawable from 'drawable'

const drawable = new Drawable({ width: 200, height: 200, backgroundColor: 'white' });
```

There are a few styles that are passed here: `width`, `height`, and `backgroundColor`. This does exactly what you would think it would do. It makes a canvas with the width of 200px height of 200px and the backgroundColor of white. If you have used canvas before you would notice that backgroundColor is not a thing. All this is really doing is creating a rectangle that fills the background of the canvas with a fill of the color passed. By default this is `transparent`.

##### Styles for constructor

| Styles key      | description                        | default     |
|-----------------|------------------------------------|-------------|
| width           | The width of the canvas            | 0           |
| height          | The height of the canvas           | 0           |
| backgroundColor | The background color of the canvas | transparent |

### Adding in some text

```javascript
const text = Drawable.text('Here is some text', {
  fontSize: 12,
  top: 20,
  left: 20,
  right: 20,
  textAlign: 'center'
});

// append text to drawable instance
drawable.append(text);
```

This is where the magic of `drawable` starts to shine. With drawable text we automatically will wrap text based on the size of the canvas and the values passed in for the `right` and `left` options. Then we calculate the alignment of the text using `textAlign` option.

##### Styles for text

| Styles key | Description                               | Default    |
|------------|-------------------------------------------|------------|
| top        | The top alignment of the text container   | 0          |
| left       | The left alignment of the text container  | 0          |
| right      | The right alignment of the text container | 0          |
| color      | The color of the text                     | #222       |
| textAlign  | Can be: 'center', 'left', or 'right'      | left       |
| lineHeight | The line height of the text               | 0          |
| fontSize   | The size of the text in pixels            | 0          |
| fontFamily | The font used in the canvas               | sans-serif |

### Adding in a image

```javascript
const image = Drawable.image('./path/to/image.jpg', {
  top: 20,
  left: 20,
});

// append text to drawable instance
drawable.append(image);
```

Now there is currently only a very simple version of `image` working. This is going to be expanded to support things like [object-fit](https://www.w3.org/TR/css3-images/#object-fit) to be able to do some magic to position the image correctly. Help wanted :D

##### Styles for text

| Styles key | Description                      | Default    |
|------------|----------------------------------|------------|
| top        | The top alignment of the image   | 0          |
| left       | The left alignment of the image  | 0          |


## TODO

- make api work on both client and server
- solidify output methods `toBuffer` and `toDataURI`
- make a public way to expose canvas element ( for appending to DOM )
- make a few adapters to work with react and ember

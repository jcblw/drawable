import test from 'ava';

const DrawableImage = require('../dist/image').default;

test('the DrawableImage exports', t => {
  t.is(
    typeof DrawableImage,
    'function',
    'Drawable export is a constructor function'
  );
});

test('the DrawableImage constructor', t => {
  const styles = { foo: 'bar' };
  const image = new DrawableImage('foo', styles);
  t.deepEqual(image._styles, styles, 'it should cache the styles');
  t.is(image._img, 'foo', 'it should cache the first param');
});

test('the "getRatio" method', t => {
  const image = new DrawableImage({});
  t.is(
    typeof image.getRatio(),
    'number',
    'getRatio method should return a number'
  );

  t.is(
    image.getRatio(1, 1),
    1,
    'getRatio divide the first param by the second param'
  );

  t.is(
    image.getRatio(1, 2),
    0.5,
    'getRatio divide the first param by the second param'
  );
});

test('"getObjectFitDimensions" method should return an object', t => {
  const image = new DrawableImage({});
  image._dimensions = {};
  t.is(
    typeof image.getObjectFitDimensions({}, ''),
    'object',
    'an object is returned'
  );
});

test('"getObjectFitDimensions" method should return an object with canvas width and a top offset', t => {
  const image = new DrawableImage('');
  image._dimensions = { width: 100, height: 200 };
  const expectedStyles = {
    width: 100,
    height: 200,
    top: -50,
    left: 0,
  };
  t.deepEqual(
    image.getObjectFitDimensions({ height: 100, width: 100 }, 'cover'),
    expectedStyles,
    'the expected styles are returned'
  );
});

test('"getObjectFitDimensions" method should return an object with canvas height and a left offset', t => {
  const image = new DrawableImage('');
  image._dimensions = { width: 200, height: 100 };
  const expectedStyles = {
    width: 200,
    height: 100,
    top: 0,
    left: -50,
  };
  t.deepEqual(
    image.getObjectFitDimensions({ height: 100, width: 100 }, 'cover'),
    expectedStyles,
    'the expected styles are returned'
  );
});

test('"getObjectFitDimensions" method should return an object that image is scaled to half size and the top has an offset', t => {
  const image = new DrawableImage('');
  image._dimensions = { width: 200, height: 100 };
  const expectedStyles = {
    width: 100,
    height: 50,
    top: 25,
    left: 0,
  };
  t.deepEqual(
    image.getObjectFitDimensions({ height: 100, width: 100 }, 'contain'),
    expectedStyles,
    'the expected styles are returned'
  );
});

test('"getObjectFitDimensions" method should return an object that image is scaled to half size and the top has an offset', t => {
  const image = new DrawableImage('');
  image._dimensions = { width: 100, height: 200 };
  const expectedStyles = {
    width: 50,
    height: 100,
    top: 0,
    left: 25,
  };
  t.deepEqual(
    image.getObjectFitDimensions({ height: 100, width: 100 }, 'contain'),
    expectedStyles,
    'the expected styles are returned'
  );
});

test('"getStyleProp" method should return 0 if no style is present', t => {
  const image = new DrawableImage('');

  t.is(image.getStyleProp('foo'), 0, 'it returned a zero');
});

test('"getStyleProp" method should return the value of the passed in styles if it is present', t => {
  const image = new DrawableImage('', { foo: 'bar' });

  t.is(image.getStyleProp('foo'), 'bar', 'it returned the passed in value');
});

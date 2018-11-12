import test from 'ava';

const DrawableText = require('../dist/text').default;

test('the DrawableText exports', t => {
  t.is(
    typeof DrawableText,
    'function',
    'Drawable export is a constructor function'
  );
});

test('the DrawableText constructor', t => {
  const styles = { foo: 'bar' };
  const text = new DrawableText('foo', styles);
  t.deepEqual(text._styles, styles, 'it should cache the styles');
  t.is(text._text, 'foo', 'it should cache the first param');
});

test('"getStyleProp" method should return 0 if no style is present', t => {
  const text = new DrawableText('');

  t.is(text.getStyleProp('foo'), 0, 'it returned a zero');
});

test('"getStyleProp" method should return the value of the passed in styles if it is present', t => {
  const text = new DrawableText('', { foo: 'bar' });
  t.is(text.getStyleProp('foo'), 'bar', 'it returned the passed in value');
});

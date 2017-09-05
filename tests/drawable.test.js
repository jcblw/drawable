import test from 'ava';
import mockRequire from 'mock-require';
let canvasMock = {
  createCanvas() {
    return {
      getContext() {
        return {};
      },
    };
  },
  registerFont() {},
};
mockRequire('canvas', canvasMock);

// need to use require to avoid hoisting by babel
const Drawable = require('../dist/drawable').default;

test('the Drawable exports', t => {
  t.is(
    typeof Drawable,
    'function',
    'Drawable export is a constructor function'
  );
});

test('the Drawable constructor', t => {
  const options = { foo: 'bar' };
  const drawable = new Drawable(options);
  t.deepEqual(drawable._options, options, 'it should cache the options');
  t.is(typeof drawable._canvas, 'object', 'it should create a canvas');
  t.is(
    typeof drawable._context,
    'object',
    'it should get the context of the canvas'
  );
  t.deepEqual(
    drawable._children,
    [],
    'it should create a blank array for children to be added'
  );
});

test('the "verifyChild" method', t => {
  const drawable = new Drawable({});
  t.false(
    drawable.verifyChild('foo'),
    'it should return false when a non object is passed'
  );
  t.false(
    drawable.verifyChild({}),
    'it should return false when an object with no draw method is passed'
  );
  t.true(
    drawable.verifyChild({ draw() {} }),
    'it should return true when an object with a draw method is passed to the method'
  );
});

test('the "draw" method should return a promise', t => {
  const foo = new Drawable({});
  t.is(typeof foo.draw().then, 'function', 'it returns a promise');
});

test('the "draw" method should call childs draw method', t => {
  t.plan(2);
  const optionsMock = { foo: 'bar' };
  const contextMock = { bar: 'baz' };
  const drawable = new Drawable(optionsMock);
  drawable._context = contextMock;
  drawable._children = [
    {
      draw(ctx, drawableOptions) {
        t.deepEqual(
          ctx,
          contextMock,
          'it calls a childs draw method with the proper context as the first param'
        );
        t.deepEqual(
          drawableOptions,
          optionsMock,
          'it calls a childs draw method with the proper options as the second param'
        );
      },
    },
  ];
  return drawable.draw();
});

test(`
  the "draw" method should call childs draw method in the correct order
  no matter how long the proceeding draw takes
`, t => {
  t.plan(3);
  let childDrawCallCount = 0;
  const drawable = new Drawable({});
  drawable._children = [
    {
      draw() {
        childDrawCallCount += 1;
        t.is(childDrawCallCount, 1, 'it is the proper call count');
        return new Promise(resolve => setTimeout(() => resolve(), 500));
      },
    },
    {
      draw() {
        childDrawCallCount += 1;
        t.is(childDrawCallCount, 2, 'it is the proper call count');
        return new Promise(resolve => setTimeout(() => resolve(), 200));
      },
    },
    {
      draw() {
        childDrawCallCount += 1;
        t.is(childDrawCallCount, 3, 'it is the proper call count');
      },
    },
  ];
  return drawable.draw();
});

test('the "drawChild" method should return a function', t => {
  const drawable = new Drawable({});
  t.is(typeof drawable.drawChild(), 'function', 'its a function');
});

test('the "drawChild" methods return function should return a promise', t => {
  const drawable = new Drawable({});
  t.is(
    typeof drawable.drawChild({ draw() {} })().then,
    'function',
    'its a promise'
  );
});

test('the "drawChild" methods return function should call the passed childs draw method', t => {
  t.plan(1);
  const drawable = new Drawable({});
  return drawable.drawChild({
    draw() {
      t.pass();
    },
  })();
});

test(`
  the "drawChild" methods return function should wait to resolve the promise
  until the childs promise is resolved
`, t => {
  t.plan(1);
  const drawable = new Drawable({});
  return drawable.drawChild({
    draw() {
      return new Promise(resolve => {
        setTimeout(() => {
          t.pass();
          resolve();
        }, 500);
      });
    },
  })();
});

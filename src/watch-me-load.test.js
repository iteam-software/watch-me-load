
import WatchMeLoad from './watch-me-load';

test('it imports as expected', () => {
  expect(WatchMeLoad).toBeTruthy();
});

test('it throws when instantiated with a null element', () => {
  expect(() => new WatchMeLoad(null)).toThrow();
});

test('it throws when instantiated with an invalid element', () => {
  expect(() => new WatchMeLoad({})).toThrow();
});

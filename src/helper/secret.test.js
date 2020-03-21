import { en, de } from './secret';

test('en()', () => {
  // given
  const token = 'asdfasdfasdfasdfasdf';

  // when
  const result = en(token);

  // then
  expect(result).toBe('asdfasdfasdfasdfasdfbG9jYWxob3N0');
});

test('de()', () => {
  const code = 'asdfasdfasdfasdfasdfbG9jYWxob3N0';

  const result = de(code);

  expect(result).toBe('asdfasdfasdfasdfasdf');
});

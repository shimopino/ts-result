import { ok, err } from 'neverthrow';

it('[neverthrow] ok', () => {
  const okResult = ok('test');

  expect(okResult._unsafeUnwrap()).toBe('test');
});

it('[neverthrow] err', () => {
  const errResult = err('err');

  expect(errResult._unsafeUnwrapErr()).toBe('err');
});

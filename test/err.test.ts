import { err } from '../src/result';

it('err', () => {
  const errResult = err('err');

  expect(errResult.isErr()).toBe(true);
  expect(errResult._unwrapErr()).toBe('err');
});

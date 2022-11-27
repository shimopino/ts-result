import { err } from '../src/ClassResult/result';

it('err', () => {
  const errResult = err('err');

  expect(errResult.isErr()).toBe(true);
  expect(errResult._unwrapErr()).toBe('err');
});

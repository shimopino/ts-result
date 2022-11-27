import { ok } from '../src/ClassResult/result';

it('ok', () => {
  const okResult = ok('test');

  expect(okResult.isOk()).toBe(true);
  expect(okResult._unwrap()).toBe('test');
});

import { ok } from '../src/result';

it('ok', () => {
  const okResult = ok('test');

  expect(okResult.isOk()).toBe(true);
  expect(okResult.value).toBe('test');
});

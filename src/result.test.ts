import { err, isErr, isOk, ok } from './result';

it('ok', () => {
  const okResult = ok('ok');

  expect(okResult.ok).toBe(true);
  expect(okResult.value).toBe('ok');
});

it('isOk', () => {
  const okResult = ok('ok');
  const isOkResult = isOk(okResult);

  expect(isOkResult).toBe(true);
});

it('err', () => {
  const errResult = err('err');

  expect(errResult.ok).toBe(false);
  expect(errResult.error).toBe('err');
});

it('isErr', () => {
  const errResult = err('err');
  const isErrResult = isErr(errResult);

  expect(isErrResult).toBe(true);
});

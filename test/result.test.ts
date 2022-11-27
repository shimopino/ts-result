import { err, Err, ok, Ok } from '../src/result';

it('Okインスタンスを作成', () => {
  const okResult = new Ok('test');

  expect(okResult.isOk()).toBe(true);
  expect(okResult.isErr()).toBe(false);
});

it('ok関数でOkインスタンスを作成', () => {
  const okResult = ok('test');

  expect(okResult.isOk()).toBe(true);
  expect(okResult.isErr()).toBe(false);
});

it('Errインスタンスを作成', () => {
  const errResult = new Err('error');

  expect(errResult.isOk()).toBe(false);
  expect(errResult.isErr()).toBe(true);
});

it('err関数でErrインスタンスを作成', () => {
  const errResult = err('error');

  expect(errResult.isOk()).toBe(false);
  expect(errResult.isErr()).toBe(true);
});

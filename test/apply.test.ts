import { err, ok, Result } from '../src/FuncResult';

it('[apply] ok', () => {
  const okResult = ok('test');
  const hello = (name: string) => `hello ${name}`;

  const applyResult = Result.apply(okResult)(ok(hello));

  expect(applyResult).toEqual({
    ok: true,
    value: 'hello test',
  });
});

it('[apply] err(fa)', () => {
  const okResult = err('err');
  const hello = (name: string) => `hello ${name}`;

  // @ts-expect-error 明示的に失敗させているため、型エラーは無視する
  const applyResult = Result.apply(okResult)(ok(hello));

  expect(applyResult).toEqual({
    ok: false,
    error: 'err',
  });
});

it('[apply] err(fab)', () => {
  const okResult = ok('test');
  const hello = (name: string) => `hello ${name}`;

  const applyResult = Result.apply(okResult)(err(hello));

  expect(applyResult).toEqual({
    ok: false,
    error: hello,
  });
});

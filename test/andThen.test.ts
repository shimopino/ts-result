import { err, ok } from '../src/result';

it('[andThen] ok', () => {
  const result = ok('test').andThen((value) => {
    return ok(`[+] ${value}`);
  });

  expect(result.isOk()).toBe(true);
  expect(result.value).toBe('[+] test');
});

it('[andThen] err', () => {
  // @ts-expect-error ErrインスタンスへのandThenは型エラーになるので無視
  const result = err('err').andThen((value) => {
    return ok(`[+] ${value}`);
  });

  expect(result.isErr()).toBe(true);
  expect(result.error).toBe('err');
});

describe('[andThen] result', () => {
  const hello = (name: string) => {
    if (name === '') return err({ type: 'EmptyStringError' });
    return ok(`hello ${name}`);
  };

  it('ok', () => {
    const name = 'test';
    const result = hello(name).andThen((value) => {
      return ok(`${value} bye`);
    });

    expect(result._unwrap()).toBe('hello test bye');
  });

  it('err', () => {
    const name = '';
    const result = hello(name).andThen((value) => {
      return ok(`${value} bye`);
    });

    expect(result._unwrapErr()).toEqual({ type: 'EmptyStringError' });
  });
});

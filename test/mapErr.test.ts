import { err, ok } from '../src/ClassResult/result';

it('[map] ok', () => {
  // @ts-expect-error OkインスタンスへのmapErrは型エラーになるので無視
  const result = ok('test').mapErr((value) => `[+] ${value}`);
  expect(result._unwrap()).toBe('test');
});

it('[map] err', () => {
  const result = err('err').mapErr((error) => `[+] ${error}`);
  expect(result._unwrapErr()).toBe('[+] err');
});

describe('[map] result', () => {
  const hello = (name: string) => {
    if (name === '') return err({ type: 'EmptyStringError' });
    return ok(`hello ${name}`);
  };

  it('ok', () => {
    const name = 'test';
    const result = hello(name).mapErr((value) => `${value} bye`);

    expect(result._unwrap()).toBe('hello test');
  });

  it('err', () => {
    const name = '';
    const result = hello(name).mapErr((error) => {
      return {
        type: `[+] ${error.type}`,
      };
    });

    expect(result._unwrapErr()).toEqual({ type: '[+] EmptyStringError' });
  });
});

import { err, ok } from '../src/result';

it('[map] ok', () => {
  const result = ok('test').map((value) => `[+] ${value}`);
  expect(result.value).toBe('[+] test');
});

it('[map] err', () => {
  // @ts-expect-error Errインスタンスへのmapは型エラーになるので無視
  const result = err('err').map((value) => `[+] ${value}`);
  expect(result.error).toBe('err');
});

describe('[map] result', () => {
  const hello = (name: string) => {
    if (name === '') return err({ type: 'EmptyStringError' });
    return ok(`hello ${name}`);
  };

  it('ok', () => {
    const name = 'test';
    const result = hello(name);

    expect(result.unwrap()).toBe('hello test');
  });

  it('err', () => {
    const name = '';
    const result = hello(name);

    expect(() => result.unwrap()).toThrow(
      'Tried to unwrap Error: {"type":"EmptyStringError"}'
    );
  });
});

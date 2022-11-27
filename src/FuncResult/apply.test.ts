import { apply } from './apply';
import { err, ok, _unwrap, _unwrapErr } from './result';

it('apply [Ok fn] [Ok a]', () => {
  const okFa = ok('test');
  const okFab = ok((value: string) => value.repeat(2));

  const result = apply(okFa)(okFab);

  expect(_unwrap(result)).toBe('testtest');
});

it('apply [Err fn] [Ok a]', () => {
  const okFa = ok('test');
  const okFab = err({ type: 'Error' });

  const result = apply(okFa)(okFab);

  expect(_unwrapErr(result)).toEqual({ type: 'Error' });
});

it('apply [Ok fn] [Err a]', () => {
  const okFa = err({ type: 'FaError' });
  const okFab = ok((value: string) => value.repeat(2));

  // @ts-expect-error 明示的な検証なので型エラーを無視
  const result = apply(okFa)(okFab);

  expect(_unwrapErr(result)).toEqual({ type: 'FaError' });
});

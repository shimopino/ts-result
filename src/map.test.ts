import { map } from './map';
import { err, ok, _unwrap, _unwrapErr } from './result';

const convert = (input: number) => String(input);

it('元の関数', () => {
  const input = 100;
  const result = convert(input);

  expect(result).toBe('100');
});

it('[成功ケース] map関数を使用して、Result型を返す関数に変換する', () => {
  const mapConvert = map(convert);

  const input = ok(100);
  const result = mapConvert(input);

  expect(result.ok).toBe(true);
  expect(_unwrap(result)).toBe('100');
});

it('[失敗ケース] map関数を使用して、Result型を返す関数に変換する', () => {
  const mapConvert = map(convert);

  const input = err({ type: 'SampleError' });
  const result = mapConvert(input);

  expect(result.ok).toBe(false);
  expect(_unwrapErr(result)).toEqual({ type: 'SampleError' });
});

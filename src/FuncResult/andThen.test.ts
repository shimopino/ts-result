import { andThen } from './andThen';
import { err, ok, Result, _unwrap, _unwrapErr } from './result';

const EmptyStringError = {
  type: 'EmptyStringError',
} as const;
type EmptyStringError = typeof EmptyStringError;

const hello = (name: string): Result<string, EmptyStringError> => {
  if (name === '') {
    return err(EmptyStringError);
  }

  return ok(`hello ${name}`);
};

test('1ウェイトラック関数', () => {
  const input = 'shimokawa';
  const result = hello(input);

  expect(result.ok).toBe(true);
});

test('[成功ケース] andThen関数で、1ウェイトラック関数を2ウェイトラック関数に変換する', () => {
  const twoTrackHello = andThen(hello);

  const input = ok('shimokawa');
  const result = twoTrackHello(input);

  expect(result.ok).toBe(true);
  expect(_unwrap(result)).toBe('hello shimokawa');
});

test('[失敗ケース] andThen関数で、1ウェイトラック関数を2ウェイトラック関数に変換する', () => {
  const twoTrackHello = andThen(hello);

  const input = ok('');
  const result = twoTrackHello(input);

  expect(result.ok).toBe(false);
  expect(_unwrapErr(result)).toEqual({ type: 'EmptyStringError' });
});

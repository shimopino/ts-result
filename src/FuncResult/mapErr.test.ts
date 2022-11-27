import { mapErr } from './mapErr';
import { err, ok, _unwrap, _unwrapErr } from './result';

const EmptyStringError = {
  type: 'EmptyStringError',
} as const;
type EmptyStringError = typeof EmptyStringError;

const String20OverError = {
  type: 'String20OverError',
} as const;
type String20OverError = typeof String20OverError;

type ValidationError = EmptyStringError | String20OverError;

test('[成功ケース] mapError関数を使用して、エラー型を異なるエラー型に変換する', () => {
  const validationError = (input: ValidationError) => input as ValidationError;
  const mapErrorHello = mapErr(validationError);

  const input = ok('shimokawa');
  const result = mapErrorHello(input);

  expect(result.ok).toBe(true);
  expect(_unwrap(result)).toBe('shimokawa');
});

test('[失敗ケース] mapError関数を使用して、エラー型を異なるエラー型に変換する', () => {
  const validationError = (input: ValidationError) => input as ValidationError;
  const mapErrorHello = mapErr(validationError);

  const input = err(EmptyStringError);
  const result = mapErrorHello(input);

  expect(result.ok).toBe(false);
  expect(_unwrapErr(result)).toEqual({ type: 'EmptyStringError' });
});

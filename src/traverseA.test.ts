import { err, isErr, isOk, ok, _unwrap, _unwrapErr } from './result';
import { traverseA } from './traverseA';

it('複数の Ok の場合', () => {
  const triple = (value: number) => ok(value * 3);
  const list = [1, 5, 10];

  const result = traverseA(triple)(list);

  expect(isOk(result)).toBe(true);
  expect(_unwrap(result)).toEqual([3, 15, 30]);
});

it('複数の Err の場合', () => {
  const triple = (_value: number) => err({ type: 'NumberError' });
  const list = [1, 5, 10];

  const result = traverseA(triple)(list);

  expect(isErr(result)).toBe(true);
  expect(_unwrapErr(result)).toEqual([
    { type: 'NumberError' },
    { type: 'NumberError' },
    { type: 'NumberError' },
  ]);
});

it('一部だけ Err を含んでいる場合', () => {
  const triple = (value: number) => {
    if (value < 0) return err({ type: 'NegativeNumberError' });
    return ok(value * 3);
  };
  const list = [1, 5, 10, -4];

  const result = traverseA(triple)(list);

  expect(isErr(result)).toBe(true);
  expect(_unwrapErr(result)).toEqual([{ type: 'NegativeNumberError' }]);
});

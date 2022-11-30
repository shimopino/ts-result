import { combine } from './combine';
import { err, ok } from './result';

it('combine ok', () => {
  const result = combine([ok('test1'), ok('test2'), ok('test3')]);

  expect(result).toEqual({
    ok: true,
    value: ['test1', 'test2', 'test3'],
  });
});

it('combine err', () => {
  const result = combine([ok('test1'), err('err1'), err('err2')]);

  expect(result).toEqual({
    ok: false,
    error: 'err1',
  });
});

import { _unwrap, _unwrapErr } from '../../../../src/FuncResult';
import { validateTitle } from './title';

it('タイトルを設定できる', () => {
  const input = 'x'.repeat(20);
  const result = validateTitle(input);
  expect(_unwrap(result)).toBe('xxxxxxxxxxxxxxxxxxxx');
});

it('タイトルに21文字以上を設定すると失敗する', () => {
  const input = 'x'.repeat(21);
  const result = validateTitle(input);
  expect(_unwrapErr(result)).toEqual({
    type: 'ValidateTitleError',
  });
});

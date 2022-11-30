import { _unwrap, _unwrapErr } from '../../../../src/FuncResult';
import { validateDueDate } from './dueDate';

const mockDate = new Date('2022-12-01');
jest.useFakeTimers().setSystemTime(mockDate);

it('[yyyy-MM-dd]で現在よりも先の日付を締切日として設定できる', () => {
  const input = '2022-12-02';
  const result = validateDueDate(input);
  expect(_unwrap(result)).toEqual(new Date('2022-12-01T15:00:00.000Z'));
});

it('[yyyy-MM-dd]の形式ではない値を指定すると失敗する', () => {
  const input = '2022/12/02';
  const result = validateDueDate(input);
  expect(_unwrapErr(result)).toEqual({
    type: 'DueDateFormatWrongError',
  });
});

it('過去の日付を指定すると失敗する', () => {
  const input = '2022-11-30';
  const result = validateDueDate(input);
  expect(_unwrapErr(result)).toEqual({
    type: 'DueDateIsNotPastError',
  });
});

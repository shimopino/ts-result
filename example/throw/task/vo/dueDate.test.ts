import { DomainError } from '../../DomainError';
import { createDate } from '../../testUtils/createDate';
import { validateDueDate } from './dueDate';

const mockDate = createDate('2022-12-01');
jest.useFakeTimers().setSystemTime(mockDate);

it('[yyyy-MM-dd]で現在よりも先の日付を締切日として設定できる', () => {
  const input = '2022-12-02';
  const result = validateDueDate(input);
  expect(result).toEqual(createDate('2022-12-02'));
});

it('[yyyy-MM-dd]の形式ではない値を指定すると失敗する', () => {
  const input = '2022/12/02';
  const target = () => validateDueDate(input);
  expect(target).toThrow(
    new DomainError('日付が [yyyy-MM-dd] 形式ではありません')
  );
});

it('過去の日付を指定すると失敗する', () => {
  const input = '2022-11-30';
  const target = () => validateDueDate(input);
  expect(target).toThrow(new DomainError('過去の日付を設定できません'));
});

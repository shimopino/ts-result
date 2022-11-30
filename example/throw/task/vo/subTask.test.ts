import { validateDueDate } from './dueDate';
import { validateSubTask } from './subTask';
import { DomainError } from '../../DomainError';
import { createDate } from '../../testUtils/createDate';

const mockDate = createDate('2022-12-01');
jest.useFakeTimers().setSystemTime(mockDate);

it('サブタスクを設定できる', () => {
  const taskDueDate = validateDueDate('2022-12-05');
  const subTasks = [
    { title: 'test1', dueDate: '2022-12-01' },
    { title: 'test2', dueDate: '2022-12-02' },
  ];

  const result = validateSubTask(subTasks, taskDueDate);

  expect(result).toEqual([
    { title: 'test1', dueDate: createDate('2022-12-01') },
    { title: 'test2', dueDate: createDate('2022-12-02') },
  ]);
});

it('サブタスクのタイトルが20文字を超えていると失敗する', () => {
  const taskDueDate = validateDueDate('2022-12-05');
  const subTasks = [
    { title: 'x'.repeat(21), dueDate: '2022-12-01' },
    { title: 'test2', dueDate: '2022-12-02' },
  ];

  const target = () => validateSubTask(subTasks, taskDueDate);

  expect(target).toThrow(
    new DomainError('タイトルは20文字以下を設定してください')
  );
});

it('サブタスクの締切日が、タスクの締切日を超えている場合は失敗する', () => {
  const taskDueDate = validateDueDate('2022-12-05');
  const subTasks = [
    { title: 'test1', dueDate: '2022-12-10' },
    { title: 'test2', dueDate: '2022-12-02' },
  ];

  const target = () => validateSubTask(subTasks, taskDueDate);

  expect(target).toThrow(
    new DomainError('タスクの締切日よりも後の日付は設定できません')
  );
});

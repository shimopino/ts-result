import { DueDate } from './dueDate';
import { validateSubTask } from './subTask';
import { createDate } from '../../testUtils/createDate';
import { _unwrap, _unwrapErr } from '../../../../src/FuncResult';

const mockDate = createDate('2022-12-01');
jest.useFakeTimers().setSystemTime(mockDate);

it('サブタスクを設定できる', () => {
  const taskDueDate = createDate('2022-12-05') as DueDate;
  const subTasks = [
    { title: 'test1', dueDate: '2022-12-01' },
    { title: 'test2', dueDate: '2022-12-02' },
  ];

  const result = validateSubTask(subTasks, taskDueDate);

  expect(_unwrap(result)).toEqual([
    { title: 'test1', dueDate: createDate('2022-12-01') },
    { title: 'test2', dueDate: createDate('2022-12-02') },
  ]);
});

it('サブタスクのタイトルが20文字を超えていると失敗する', () => {
  const taskDueDate = createDate('2022-12-05') as DueDate;
  const subTasks = [
    { title: 'x'.repeat(21), dueDate: '2022-12-01' },
    { title: 'test2', dueDate: '2022-12-02' },
  ];

  const result = validateSubTask(subTasks, taskDueDate);

  expect(_unwrapErr(result)).toEqual({
    type: 'ValidateTitleError',
  });
});

it('サブタスクの締切日が、タスクの締切日を超えている場合は失敗する', () => {
  const taskDueDate = createDate('2022-12-05') as DueDate;
  const subTasks = [
    { title: 'test1', dueDate: '2022-12-10' },
    { title: 'test2', dueDate: '2022-12-02' },
  ];

  const result = validateSubTask(subTasks, taskDueDate);

  expect(_unwrapErr(result)).toEqual({
    type: 'DueDateIsNotOverTaskDueDateError ',
  });
});

import { _unwrap } from '../../../src/FuncResult';
import { createDate } from '../testUtils/createDate';
import { createTaskUseCase } from './createTask';

const mockDate = createDate('2022-12-01');
jest.useFakeTimers().setSystemTime(mockDate);

it('TODOタスクを作成することができる', () => {
  const payload = {
    title: 'test1',
    dueDate: '2022-12-10',
    subTasks: [
      { title: 'test2', dueDate: '2022-12-01' },
      { title: 'test3', dueDate: '2022-12-05' },
    ],
  };

  const result = createTaskUseCase(payload);

  expect(_unwrap(result)).toEqual({
    kind: 'CreatedTask',
    title: 'test1',
    dueDate: createDate('2022-12-10'),
    subTasks: [
      { title: 'test2', dueDate: createDate('2022-12-01') },
      { title: 'test3', dueDate: createDate('2022-12-05') },
    ],
    status: 'TODO',
    postphoneCount: 0,
  });
});

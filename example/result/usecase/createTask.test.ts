import { _unwrap } from '../../../src';
import { createDate } from '../testUtils/createDate';
import { createTaskUseCase } from './createTask';
import { nanoid } from 'nanoid';

jest.mock('nanoid');
const nanoidMock = jest.mocked(nanoid);

const mockDate = createDate('2022-12-01');
jest.useFakeTimers().setSystemTime(mockDate);

beforeEach(() => {
  jest.resetAllMocks();
});

it('TODOタスクを作成することができる', async () => {
  nanoidMock.mockReturnValueOnce('id mocked');

  const payload = {
    title: 'test1',
    dueDate: '2022-12-10',
    subTasks: [
      { title: 'test2', dueDate: '2022-12-01' },
      { title: 'test3', dueDate: '2022-12-05' },
    ],
  };

  const result = await createTaskUseCase(payload);

  expect(_unwrap(result)).toEqual({
    kind: 'CreatedTask',
    id: 'id mocked',
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

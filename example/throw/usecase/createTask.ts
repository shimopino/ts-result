import { pipe } from '../../../src/pipe';
import { createTask } from '../task/handlers/createTask';
import { validateTask } from '../task/handlers/validateTask';
import { UnvalidatedCreateTask } from '../types';

export type Payload = {
  title: string;
  dueDate: string;
  subTasks: {
    title: string;
    dueDate: string;
  }[];
};

export const createTaskUseCase = (payload: Payload) => {
  const input: UnvalidatedCreateTask = {
    kind: 'UnvalidatedCreateTask',
    ...payload,
  };

  const workflow = pipe(validateTask, createTask);
  const result = workflow(input);

  return result;
};

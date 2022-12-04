import { ok, Result } from '../../../src';
import { pipeWith } from '../../../src/pipeWith';
import { save } from '../repository';
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

export const createTaskUseCase = async (payload: Payload) => {
  const input: UnvalidatedCreateTask = {
    kind: 'UnvalidatedCreateTask',
    ...payload,
  };

  const result = await pipeWith(
    ok(input),
    Result.andThen(validateTask),
    Result.andThen(createTask),
    Result.mapAsync(save)
  );

  return result;
};

import { ok, Result } from '../../../../src/FuncResult/result';
import { CreatedTask, ValidatedCreateTask } from '../../types';
import { TASK_STATUS } from '../vo/TaskStatus';

export type CreateTask = (
  validatedTask: ValidatedCreateTask
) => Result<CreatedTask, never>;

export const createTask: CreateTask = (validatedTask) => {
  return ok({
    kind: 'CreatedTask',
    title: validatedTask.title,
    dueDate: validatedTask.dueDate,
    subTasks: validatedTask.subTasks,
    status: TASK_STATUS.TODO,
    postphoneCount: 0,
  });
};

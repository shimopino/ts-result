import { CreatedTask, ValidatedCreateTask } from '../../types';
import { TASK_STATUS } from '../vo/TaskStatus';

export type CreateTask = (validatedTask: ValidatedCreateTask) => CreatedTask;

export const createTask: CreateTask = (validatedTask) => {
  return {
    kind: 'CreatedTask',
    title: validatedTask.title,
    dueDate: validatedTask.dueDate,
    subTasks: validatedTask.subTasks,
    status: TASK_STATUS.TODO,
    postphoneCount: 0,
  };
};

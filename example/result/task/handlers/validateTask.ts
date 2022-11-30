import { UnvalidatedCreateTask, ValidatedCreateTask } from '../../types';
import { validateDueDate } from '../vo/dueDate';
import { validateSubTask } from '../vo/subTask';
import { validateTitle } from '../vo/title';

export type ValidateTask = (
  unvalidatedTask: UnvalidatedCreateTask
) => ValidatedCreateTask;

export const validateTask: ValidateTask = (unvalidatedTask) => {
  const { title, dueDate, subTasks } = unvalidatedTask;

  const validatedTitle = validateTitle(title);
  const validatedDueDate = validateDueDate(dueDate);
  const validatedSubTasks = validateSubTask(subTasks, validatedDueDate);

  return {
    kind: 'ValidatedCreateTask',
    title: validatedTitle,
    dueDate: validatedDueDate,
    subTasks: validatedSubTasks,
  };
};

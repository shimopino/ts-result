import { DueDate, validateDueDate } from './dueDate';
import { Title, validateTitle } from './title';
import { isAfter } from 'date-fns';
import { DomainError } from '../DomainError';

export type ValidateSubTask = (
  subTasks: { title: string; dueDate: string }[],
  taskDueDate: DueDate
) => { title: Title; dueDate: DueDate }[];

export const validateSubTask: ValidateSubTask = (subtasks, taskDueDate) => {
  const validatedSubTasks = subtasks.map((subTask) => ({
    title: validateTitle(subTask.title),
    dueDate: validateDueDate(subTask.dueDate),
  }));

  validatedSubTasks.forEach((subTask) => {
    if (isAfter(subTask.dueDate, taskDueDate)) {
      throw new DomainError('タスクの締切日よりも後の日付は設定できません');
    }
  });

  return validatedSubTasks;
};

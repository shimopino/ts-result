import { Result, ResultType } from '../../../../src';
import { pipeWith } from '../../../../src/pipeWith';
import { UnvalidatedCreateTask, ValidatedCreateTask } from '../../types';
import { validateDueDate, ValidateDueDateError } from '../vo/dueDate';
import { validateSubTask, ValidateSubTaskError } from '../vo/subTask';
import { validateTitle, ValidateTitleError } from '../vo/title';

export type ValidateTaskError =
  | ValidateTitleError
  | ValidateDueDateError
  | ValidateSubTaskError;
export type ValidateTask = (
  unvalidatedTask: UnvalidatedCreateTask
) => ResultType<ValidatedCreateTask, ValidateTaskError>;

// @ts-expect-error combineの型修正
export const validateTask: ValidateTask = (unvalidatedTask) => {
  const { title, dueDate, subTasks } = unvalidatedTask;

  const validatedTitle = validateTitle(title);
  const validatedDueDate = validateDueDate(dueDate);
  const validatedSubTasks = pipeWith(
    validatedDueDate,
    Result.andThen((dueDate) => {
      return validateSubTask(subTasks, dueDate);
    })
  );

  return pipeWith(
    // @ts-expect-error combineの型修正
    Result.combine([validatedTitle, validatedDueDate, validatedSubTasks]),
    Result.map(([title, dueDate, subTasks]) => {
      return {
        kind: 'ValidatedCreateTask',
        title,
        dueDate,
        subTasks,
      };
    })
  );
};

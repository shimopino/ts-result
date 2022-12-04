import { DueDate, validateDueDate, ValidateDueDateError } from './dueDate';
import { Title, validateTitle, ValidateTitleError } from './title';
import { isAfter } from 'date-fns';
import { ok, err, ResultType, Result } from '../../../../src';
import { pipeWith } from '../../../../src/pipeWith';

export type ValidateSubTaskError =
  | ValidateTitleError
  | ValidateDueDateError
  | { type: 'DueDateIsNotOverTaskDueDateError' };

export type ValidateSubTask = (
  subTasks: { title: string; dueDate: string }[],
  taskDueDate: DueDate
) => ResultType<{ title: Title; dueDate: DueDate }[], ValidateSubTaskError>;

// @ts-expect-error combineでエラーの型が効いていないため修正
export const validateSubTask: ValidateSubTask = (subtasks, taskDueDate) => {
  const validatedSubTasks = subtasks.map((subTask) => {
    const validatedTitle = validateTitle(subTask.title);
    const validatedDueDate = validateDueDate(subTask.dueDate);

    return pipeWith(
      // @ts-expect-error 型推論が効くように修正
      Result.combine([validatedTitle, validatedDueDate]),
      Result.map(([title, dueDate]) => ({
        title: title,
        // @ts-expect-error 型推論が効くように修正
        dueDate: dueDate as DueDate,
      })),
      Result.andThen((subTask) => {
        if (isAfter(subTask.dueDate, taskDueDate)) {
          return err({ type: 'DueDateIsNotOverTaskDueDateError ' } as const);
        }

        return ok(subTask);
      })
    );
  });

  return pipeWith(
    Result.combine(validatedSubTasks),
    Result.andThen((subTasks) => {
      return ok(subTasks);
    })
  );
};

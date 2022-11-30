import { Branded } from '../../../brand';
import { parse, isValid } from 'date-fns';
import { err, ok, Result } from '../../../../src/FuncResult/result';

export type DueDate = Branded<Date, 'DueDate'>;
export type ValidateDueDateError =
  | { type: 'DueDateFormatWrongError' }
  | { type: 'DueDateIsNotPastError' };

export type ValidateDueDate = (
  dueDate: string
) => Result<DueDate, ValidateDueDateError>;

export const validateDueDate: ValidateDueDate = (dueDate) => {
  const parsedDueDate = parse(dueDate, 'yyyy-MM-dd', new Date());

  if (!isValid(parsedDueDate)) {
    return err({ type: 'DueDateFormatWrongError' });
  }

  const now = Date.now();
  if (parsedDueDate.getTime() < now) {
    return err({ type: 'DueDateIsNotPastError' });
  }

  return ok(parsedDueDate as DueDate);
};

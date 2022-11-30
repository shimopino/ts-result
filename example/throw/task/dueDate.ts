import { Branded } from '../../brand';
import { parse, isValid } from 'date-fns';
import { DomainError } from '../DomainError';

export type DueDate = Branded<Date, 'DueDate'>;

export type ValidateDueDate = (dueDate: string) => DueDate;

export const validateDueDate: ValidateDueDate = (dueDate) => {
  const parsedDueDate = parse(dueDate, 'yyyy-MM-dd', new Date());

  if (!isValid(parsedDueDate)) {
    throw new DomainError('日付が [yyyy-MM-dd] 形式ではありません');
  }

  const now = Date.now();
  if (parsedDueDate.getTime() < now) {
    throw new DomainError('過去の日付を設定できません');
  }

  return parsedDueDate as DueDate;
};

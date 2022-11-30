import { err } from '../../../../src/FuncResult';
import { ok, Result } from '../../../../src/FuncResult/result';
import { Branded } from '../../../brand';

export type Title = Branded<string, 'Title'>;
export type ValidateTitleError = { type: 'ValidateTitleError' };

export type ValidateTitle = (
  title: string
) => Result<Title, ValidateTitleError>;

export const validateTitle: ValidateTitle = (title) => {
  if (title.length > 20) {
    return err({ type: 'ValidateTitleError' });
  }

  return ok(title as Title);
};

import { ok, err, ResultType } from '../../../../src';
import { Branded } from '../../../brand';

export type Title = Branded<string, 'Title'>;
export type ValidateTitleError = { type: 'ValidateTitleError' };

export type ValidateTitle = (
  title: string
) => ResultType<Title, ValidateTitleError>;

export const validateTitle: ValidateTitle = (title) => {
  if (title.length > 20) {
    return err({ type: 'ValidateTitleError' });
  }

  return ok(title as Title);
};

import { Branded } from '../../../brand';
import { DomainError } from '../../DomainError';

export type Title = Branded<string, 'Title'>;

export type ValidateTitle = (title: string) => Title;

export const validateTitle: ValidateTitle = (title) => {
  if (title.length > 20) {
    throw new DomainError('タイトルは20文字以下を設定してください');
  }

  return title as Title;
};

import { DomainError } from '../DomainError';
import { validateTitle } from './title';

it('タイトルを設定できる', () => {
  const input = 'x'.repeat(20);
  const result = validateTitle(input);
  expect(result).toBe('xxxxxxxxxxxxxxxxxxxx');
});

it('タイトルに21文字以上を設定すると失敗する', () => {
  const input = 'x'.repeat(21);
  const target = () => validateTitle(input);
  expect(target).toThrow(
    new DomainError('タイトルは20文字以下を設定してください')
  );
});

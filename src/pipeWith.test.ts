import { pipeWith } from './pipeWith';

it('pipe', () => {
  const result = pipeWith(
    900,
    (initialValue: number) => initialValue + 100,
    (value) => String(value),
    (value) => value.length
  );

  expect(result).toBe(4);
});

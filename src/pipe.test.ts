import { pipe } from './pipe';

it('pipe', () => {
  const workflow = pipe(
    (initialValue: number) => initialValue + 100,
    (value) => String(value),
    (value) => value.length
  );

  const result = workflow(900);

  expect(result).toBe(4);
});

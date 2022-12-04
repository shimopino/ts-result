import { err, isErr, isOk, ok, Result } from './result';

export const combine = <T, E>(results: Result<T, E>[]): Result<T[], E> => {
  return results.reduce(
    (acc, result) =>
      isOk(acc)
        ? isErr(result)
          ? err(result.error)
          : ok([...acc.value, result.value])
        : acc,
    ok([]) as Result<T[], E>
  );
};

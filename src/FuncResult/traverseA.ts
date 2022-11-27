import { err, isErr, ok, Result } from './result';

// type TraverseA = <A, B, E>(
//   fn: (a: A) => Result<B, E>
// ) => (as: A[]) => Result<B[], E[]>;

export const traverseA =
  <A, B, E>(fn: (a: A) => Result<B, E>) =>
  (as: A[]): Result<B[], E[]> => {
    //   const first = fn(head(as));
    //   const okOut = isOk(first) ? [first.value] : [];
    //   const errOut = isErr(first) ? [first.error] : [];

    //   for (let i = 1; i < as.length; i++) {
    //     const next = fn(as[i]);
    //     if (isOk(next)) okOut.push(next.value);
    //     if (isErr(next)) errOut.push(next.error);
    //   }

    const resultList = as.map((a) => fn(a));

    return resultList.reduce(
      (acc, result) =>
        isErr(result)
          ? isErr(acc)
            ? err([...acc.error, result.error])
            : err([result.error])
          : isErr(acc)
          ? acc
          : ok([...acc.value, result.value]),
      ok([]) as Result<B[], E[]>
    );
  };

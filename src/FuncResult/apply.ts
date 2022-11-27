import { isErr, ok, Result } from './result';

type Apply = <A, E>(
  fa: Result<A, E>
) => <B, F>(fab: Result<(a: A) => B, F>) => Result<B, E | F>;

export const apply: Apply = (fa) => (fab) => {
  if (isErr(fab)) return fab;
  if (isErr(fa)) return fa;

  return ok(fab.value(fa.value));
};

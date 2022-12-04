import { isErr, ok, Result } from './result';
import { head } from './utils/head';

type TraverseM = <A, B, E>(
  fn: (a: A) => Result<B, E>
) => (as: A[]) => Result<B[], E>;

export const traverseM: TraverseM = (fn) => (as) => {
  const first = fn(head(as));
  if (isErr(first)) return first;

  const out = [first.value];
  for (let i = 1; i < as.length; i++) {
    const next = fn(as[i]);
    if (isErr(next)) return next;
    out.push(next.value);
  }

  return ok(out);
};

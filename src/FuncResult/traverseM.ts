import { isErr, ok, Result } from './result';
import { head } from './utils/head';

type TraverseM = <A, B, E>(
  fn: (a: A) => Result<B, E>
) => (a: A[]) => Result<B[], E>;

export const traverseM: TraverseM = (fn) => (a) => {
  const first = fn(head(a));
  if (isErr(first)) return first;

  const out = [first.value];
  for (let i = 1; i < a.length; i++) {
    const next = fn(a[i]);
    if (isErr(next)) return next;
    out.push(next.value);
  }

  return ok(out);
};

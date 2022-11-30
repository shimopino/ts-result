import { UnknownFunction } from './pipe';

export function pipeWith<A, B>(a: A, ab: (a: A) => B): B;
export function pipeWith<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
export function pipeWith<A, B, C, D>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): D;
export function pipeWith<A, B, C, D, E>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): E;
export function pipeWith<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F;
export function pipeWith(value: unknown, ...fns: UnknownFunction[]): unknown {
  let ret = value;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](ret);
  }
  return ret;
}

export type UnknownFunction = (...params: unknown[]) => unknown;

export function pipe<A extends unknown[], B>(
  ab: (...args: A) => B
): (...args: A) => B;
export function pipe<A extends unknown[], B, C>(
  ab: (...args: A) => B,
  bc: (b: B) => C
): (...args: A) => C;
export function pipe<A extends unknown[], B, C, D>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D
): (...args: A) => D;
export function pipe<A extends unknown[], B, C, D, E>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E
): (...args: A) => E;
export function pipe<A extends unknown[], B, C, D, E, F>(
  ab: (...args: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): (...args: A) => F;
export function pipe(...fns: UnknownFunction[]): UnknownFunction {
  return (...initialParams: unknown[]): unknown =>
    fns.reduce<unknown>((value, fn, index) => {
      const params = index === 0 ? (value as unknown[]) : [value];
      return fn(...params);
    }, initialParams);
}

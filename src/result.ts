import { toString } from './utiles/toString';

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T) => new Ok(value);
export const err = <E>(error: E) => new Err(error);

export class Ok<T> {
  constructor(readonly value: T) {}

  isOk(): this is Ok<T> {
    return true;
  }

  isErr(): this is Err<never> {
    return false;
  }

  map<T2>(mapper: (value: T) => T2): Ok<T2> {
    return ok(mapper(this.value));
  }

  unwrap(): T {
    return this.value;
  }
}

export class Err<E> {
  constructor(readonly error: E) {}

  isOk(): this is Ok<never> {
    return false;
  }

  isErr(): this is Err<E> {
    return true;
  }

  map(_mapper: unknown): Err<E> {
    return this;
  }

  unwrap(): never {
    throw new Error(`Tried to unwrap Error: ${toString(this.error)}`);
  }
}

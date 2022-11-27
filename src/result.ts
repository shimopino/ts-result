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
}

export class Err<E> {
  constructor(readonly error: E) {}

  isOk(): this is Ok<never> {
    return false;
  }

  isErr(): this is Err<E> {
    return true;
  }
}

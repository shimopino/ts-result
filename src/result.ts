export type Result<T, E> = Ok<T> | Err<E>;
export const ok = <T>(value: T) => new Ok(value);
export const err = <E>(error: E) => new Err(error);

export class Ok<T> {
  public constructor(private readonly value: T) {}

  public isOk() {
    return true;
  }

  public isErr() {
    return false;
  }
}

export class Err<E> {
  public constructor(private readonly error: E) {}

  public isOk() {
    return false;
  }

  public isErr() {
    return true;
  }
}

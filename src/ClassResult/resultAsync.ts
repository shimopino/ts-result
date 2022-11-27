import { ok } from 'assert';
import { Err, err, Ok, Result } from './result';

export class ResultAsync<T, E> implements PromiseLike<Result<T, E>> {
  constructor(private readonly promise: Promise<Result<T, E>>) {}

  map<T2>(mapper: (value: T) => T2 | Promise<T2>): ResultAsync<T2, E> {
    return new ResultAsync(
      this.promise.then(async (res: Result<T, E>) => {
        if (res.isErr()) return err(res.error);

        // TODO: ok関数を使用すると型推論に void がきてしまい型エラーが発生
        return new Ok(await mapper(res.value));
      })
    );
  }

  mapErr<E2>(mapper: (error: E) => E2 | Promise<E2>): ResultAsync<T, E2> {
    return new ResultAsync(
      this.promise.then(async (res: Result<T, E>) => {
        // TODO: ok関数を使用すると型推論に void がきてしまい型エラーが発生
        if (res.isOk()) return new Ok(res.value);

        return err(await mapper(res.error));
      })
    );
  }

  then<T1, T2>(
    successCallback?: (res: Result<T, E>) => T1 | PromiseLike<T1>,
    failureCallback?: (reason: unknown) => T2 | PromiseLike<T2>
  ): PromiseLike<T1 | T2> {
    return this.promise.then(successCallback, failureCallback);
  }
}

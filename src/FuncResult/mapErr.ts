import { err, isOk, Result } from './result';

type MapErr = <E, F>(
  fn: (e: E) => F
) => <A>(input: Result<A, E>) => Result<A, F>;

/**
 * 関数から出力されるResult型のエラーを、別のエラー型に変換する
 *
 * 関数固有のエラー型を、パイプラインで共通のエラー型などに変換する際に使用する
 *
 * @param fn あるエラー型 E を別のエラー型 F に変換する関数
 * @returns 入力の引数は変わらず、出力のエラー型が F に変換された関数
 */
export const mapErr: MapErr = (fn) => (input) => {
  if (isOk(input)) return input;

  return err(fn(input.error));
};

import { map } from './map';
import { mapAsync } from './mapAsync';
import { mapErr } from './mapErr';
import { andThen } from './andThen';
import { apply } from './apply';
import { traverseA } from './traverseA';
import { traverseM } from './traverseM';
import { combine } from './combine';
export {
  ok,
  isOk,
  isErr,
  err,
  _unwrapErr,
  _unwrap,
  Ok,
  Err,
  Result as ResultType,
} from './result';
export { pipe } from './pipe';
export { pipeWith } from './pipeWith';

export const Result = {
  map,
  mapAsync,
  mapErr,
  andThen,
  apply,
  traverseA,
  traverseM,
  combine,
};

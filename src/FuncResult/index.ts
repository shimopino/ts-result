import { map } from './map';
import { mapErr } from './mapErr';
import { andThen } from './andThen';
export * from './result';

export const Result = {
  map,
  mapErr,
  andThen,
};

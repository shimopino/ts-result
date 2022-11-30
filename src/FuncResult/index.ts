import { map } from './map';
import { mapErr } from './mapErr';
import { andThen } from './andThen';
import { apply } from './apply';
import { traverseA } from './traverseA';
import { traverseM } from './traverseM';
import { combine } from './combine';
export * from './result';

export const Result = {
  map,
  mapErr,
  andThen,
  apply,
  traverseA,
  traverseM,
  combine,
};

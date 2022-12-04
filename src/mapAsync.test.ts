import { setTimeout } from 'timers/promises';
import { mapAsync } from './mapAsync';
import { err, ok, _unwrap, _unwrapErr } from './result';

it('[mapAsync] ok', async () => {
  const okResult = ok('test');

  const result = await mapAsync(async (name: string) => {
    await setTimeout(500);
    return `hello ${name}`;
  })(okResult);

  expect(_unwrap(result)).toEqual('hello test');
});

it('[mapAsync] err', async () => {
  const errResult = err({ type: 'err' });

  const result = await mapAsync(async (name: string) => {
    await setTimeout(500);
    return `hello ${name}`;
  })(errResult);

  expect(_unwrapErr(result)).toEqual({ type: 'err' });
});

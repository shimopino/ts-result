import { parse } from 'date-fns';

export const createDate = (date: string) =>
  parse(date, 'yyyy-MM-dd', new Date());

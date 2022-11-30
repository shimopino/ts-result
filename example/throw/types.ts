import { DueDate } from './task/dueDate';
import { Title } from './task/title';

export type UnvalidatedCreateTask = {
  kind: 'UnvalidatedCreateTask';
  title: string;
  subTasks: {
    title: string;
    dueDate: string;
  }[];
  dueDate: string;
};

export type ValidatedCreateTask = {
  kind: 'ValidatedCreateTask';
  title: Title;
  subTask: {
    title: Title;
    dueDate: DueDate;
  }[];
  dueDate: DueDate;
};

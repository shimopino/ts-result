import { DueDate } from './task/dueDate';
import { TASK_STATUS } from './task/TaskStatus';
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
  subTasks: {
    title: Title;
    dueDate: DueDate;
  }[];
  dueDate: DueDate;
};

export type CreatedTask = {
  kind: 'CreatedTask';
  title: Title;
  subTasks: {
    title: Title;
    dueDate: DueDate;
  }[];
  dueDate: DueDate;
  status: typeof TASK_STATUS.TODO;
  postphoneCount: 0;
};

import { SubTask, Task } from '@prisma/client';
import { CreatedTask } from '../types';

export type saveFn = (task: CreatedTask) => Promise<
  Task & {
    subTasks: SubTask[];
  }
>;

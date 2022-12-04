import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import { saveFn } from './task/repository';

const client = new PrismaClient();

export const save: saveFn = async (task) => {
  const saved = await client.task.create({
    data: {
      id: task.id,
      title: task.title,
      status: task.status,
      dueDate: task.dueDate,
      postphoneCount: task.postphoneCount,
      subTasks: {
        create: task.subTasks.map((subTask) => ({
          id: nanoid(),
          title: subTask.title,
          dueDate: subTask.dueDate,
        })),
      },
    },
    include: {
      subTasks: true,
    },
  });

  return saved;
};

// repositories/taskRepository.ts
import Task from '#models/Task';

export const getTasksByUserId = async (userId: number) => {
  return Task.findAll({ where: { userId } });
};

export const createTask = async (taskData: { title: string; subtitle: string; userId: number }) => {
  return Task.create(taskData);
};

export const updateTask = async (id: number, userId: number, updates: Partial<Task>) => {
  return Task.update(updates, { where: { id, userId } });
};

export const deleteTask = async (id: number, userId: number) => {
  return Task.destroy({ where: { id, userId } });
};

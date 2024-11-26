import { Request, Response } from 'express';
import { getTasksByUserId, createTask, updateTask, deleteTask } from '#repositories/taskRepository';
import { verifyToken } from '#services/authService';
import asyncHandler from '#utils/asyncHandler';
import { isError, validateUserId } from '#utils/validators';
import logger from '#utils/logger';

export const listUserTasks = asyncHandler(async (req: Request | any, res: Response) => {
  logger.debug("## listUserTasks ## start")
  try {
    const userId = req.user.id
    if(!userId) return res.status(403).json({ message: 'Invalid or expired token' });

    const tasks = await getTasksByUserId(userId!);
    logger.debug("## listUserTasks ## end")
    return res.status(200).json(tasks);
  } catch (error) {
    if (isError(error)) {
      return res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
    }
    logger.error('Unknown retrieving tasks:', error);
    return res.status(500).json({ message: 'Unknown error retrieving tasks' });
  }
});

export const addTask = asyncHandler(async (req: Request | any , res: Response) => {
  logger.debug("## addTask ## start")
  try {

    const userId = req.user.id
    console.log(userId)
    if(!userId) return res.status(403).json({ message: 'Invalid or expired token' });

    const { title, subtitle } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({ message: 'Title and subtitle are required' });
    }

    const task = await createTask({ title, subtitle, userId });
    logger.debug("## addTask ## end")
    return res.status(201).json(task);
  } catch (error) {
    if (isError(error)) {
    return res.status(500).json({ message: 'Error creating task', error: error.message });
    }
    logger.error('Unknown retrieving tasks:', error);
    return res.status(500).json({ message: 'Unknown error creating task' });
  }
});

export const editTask = asyncHandler(async (req: Request | any, res: Response) => {
  logger.debug("## editTask ## start")
  try {
    const userId = req.user.id
    if(!userId) return res.status(403).json({ message: 'Invalid or expired token' });
    const { id } = req.params;
    const updates = req.body;

    const [updatedRows] = await updateTask(Number(id), userId, updates);
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    logger.debug("## editTask ## end")
    return res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    if (isError(error)) {
      return res.status(500).json({ message: 'Error updating task', error: error.message });
      }
      logger.error('Unknown retrieving tasks:', error);
      return res.status(500).json({ message: 'Unknown error updating task' });
  }
});

export const removeTask = asyncHandler(async (req: Request | any, res: Response) => {
  logger.debug("## removeTask ## start")
  try {
    const userId = req.user.id
    if(!userId) return res.status(403).json({ message: 'Invalid or expired token' });

    if(!validateUserId(userId)) return res.status(403).json({ message: 'Invalid or expired token' });
    const { id } = req.params;

    const deletedRows = await deleteTask(Number(id), userId);
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    logger.debug("## removeTask ## end")
    return res.status(204).send();
  } catch (error) {
    if (isError(error)) {
      return res.status(500).json({ message: 'Error deleting task', error: error.message });
      }
      logger.error('Unknown retrieving tasks:', error);
      return res.status(500).json({ message: 'Unknown error deleting task' });
  }
});

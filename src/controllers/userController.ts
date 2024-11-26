import { Request, Response } from 'express';
import UserRepository from '#repositories/userRepository';
import logger from '#utils/logger';
import asyncHandler from '#utils/asyncHandler'; 
import { CreateUserInput } from '#types/inputs/userInput';
import bcrypt from 'bcrypt';
import { isError } from '#utils/validators';


export const createUser = asyncHandler(async (req: Request, res: Response) => {
  logger.debug("## createUser ## start")
  const userData: CreateUserInput = req.body;

  try {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await UserRepository.createUser({ ...userData, password: hashedPassword });
  logger.debug("## createUser ## end")
    return res.status(201).json(user);
  } catch (error) {
    if (isError(error)) {
      logger.error('Error creating user:', error);
      return res.status(500).json({ message: 'Error creating user', error: error.message });
    }

    logger.error('Unknown error creating user:', error);
    return res.status(500).json({ message: 'Unknown error creating user' });
  }
});


export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
  logger.debug("## getUserByEmail ## start")
  const { email } = req.params;

  try {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    logger.debug("## getUserByEmail ## end")
    return res.status(200).json(user);
  } catch (error) {
    if (isError(error)) {
      logger.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user', error: error.message });
    }

    logger.error('Unknown error fetching user:', error);
    return res.status(500).json({ message: 'Unknown error fetching user' });
  }
});


export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  logger.debug("## updateUser ## start")
  const { id } = req.params;
  const { name, email, password } = req.body;

  const newPassword = password ? await bcrypt.hash(password, 10) : undefined;

  try {
    const updatedUser = await UserRepository.updateUser(Number(id), { name, email, password: newPassword });
    logger.debug("## updateUser ## end")
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (isError(error)) {
      logger.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user', error: error.message });
    }

    logger.error('Unknown error updating user:', error);
    return res.status(500).json({ message: 'Unknown error updating user' });
  }
});


export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  logger.debug("## deleteUser ## start")
  const { id } = req.params;

  try {
    await UserRepository.deleteUser(Number(id));
    logger.debug("## deleteUser ## end")
    return res.status(204).send(); 
  } catch (error) {
    if (isError(error)) {
      logger.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }

    logger.error('Unknown error deleting user:', error);
    return res.status(500).json({ message: 'Unknown error deleting user' });
  }
});

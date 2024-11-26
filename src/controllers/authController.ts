import { Request, Response } from 'express';
import { authenticateUser } from '#services/authService';
import logger from '#utils/logger';
import asyncHandler from '#utils/asyncHandler';

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  logger.debug("## loginUser ## start")
  const { email, password } = req.body;

  try {
    // Valida e autentica o usuário
    const token = await authenticateUser({email, password});

    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Retorna o token em caso de sucesso
    logger.debug("## loginUser ## end")
    return res.status(200).json({ token });
  } catch (error) {
    logger.error('Error during login:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
});
// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header is missing' });
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ message: 'Token is missing' });
const acesstokensecret = process.env.JWT_SECRET || 'your_secret_key';

jwt.verify(token, acesstokensecret, (err, user) => {
      if (err) res.status(403).json({ message: 'Invalid or expired token' });
      req.user = user;
      next();
  }); 
};



import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7); // Remove 'Bearer ' from the token
    try {
      const decoded = jwt.verify(token, 'your_secret_key') as { userId: number, otherData: any };
      req.user.id =  decoded.userId ;
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

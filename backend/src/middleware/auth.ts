import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { errorResponse } from '../utils/response';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    userGroup: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(errorResponse('MISSING_TOKEN', 'Authorization token is required'));
    }

    const token = authHeader.substring(7);
    const payload = authService.verifyToken(token);

    req.user = {
      userId: payload.userId,
      email: payload.email,
      userGroup: payload.userGroup
    };

    next();
  } catch (error: any) {
    if (error.message === 'INVALID_TOKEN') {
      return res.status(401).json(errorResponse('INVALID_TOKEN', 'Invalid or expired token'));
    }
    return res.status(401).json(errorResponse('AUTH_ERROR', 'Authentication failed'));
  }
};

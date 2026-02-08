import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import userService from '../services/user.service';
import { successResponse, errorResponse } from '../utils/response';

const router = Router();

router.get('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const profile = await userService.getProfile(userId);
    res.json(successResponse(profile));
  } catch (error: any) {
    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json(errorResponse('USER_NOT_FOUND', 'User not found'));
    }
    res.status(500).json(errorResponse('FETCH_FAILED', error.message));
  }
});

router.put('/profile', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const { name, language } = req.body;
    const profile = await userService.updateProfile(userId, { name, language });
    res.json(successResponse(profile));
  } catch (error: any) {
    res.status(500).json(errorResponse('UPDATE_FAILED', error.message));
  }
});

router.get('/progress', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const progress = await userService.getProgress(userId);
    res.json(successResponse(progress));
  } catch (error: any) {
    if (error.message === 'PROGRESS_NOT_FOUND') {
      return res.status(404).json(errorResponse('PROGRESS_NOT_FOUND', 'Progress not found'));
    }
    res.status(500).json(errorResponse('FETCH_FAILED', error.message));
  }
});

export default router;

import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import rulesService from '../services/rules.service';
import { successResponse, errorResponse } from '../utils/response';

const router = Router();

router.get('/cached', authenticate, async (req: AuthRequest, res) => {
  try {
    const userGroup = req.query.userGroup as string || req.user!.userGroup;
    const rules = await rulesService.getCachedRules(userGroup);
    res.json(successResponse(rules));
  } catch (error: any) {
    res.status(500).json(errorResponse('FETCH_FAILED', error.message));
  }
});

export default router;

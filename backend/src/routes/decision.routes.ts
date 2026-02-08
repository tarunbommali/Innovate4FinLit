import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import decisionService from '../services/decision.service';
import { successResponse, errorResponse } from '../utils/response';

const router = Router();

router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const { scenarioId, choiceId, clientEventId, timestamp, timeSpent } = req.body;

    if (!scenarioId || !choiceId || !clientEventId) {
      return res.status(400).json(errorResponse('MISSING_FIELDS', 'scenarioId, choiceId, and clientEventId are required'));
    }

    const result = await decisionService.evaluateDecision({
      userId,
      scenarioId,
      choiceId,
      clientEventId,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      timeSpent
    });

    res.json(successResponse(result));
  } catch (error: any) {
    if (error.message === 'DUPLICATE_EVENT') {
      // Idempotent - return existing decision
      return res.status(200).json(successResponse({ message: 'Decision already processed' }));
    }
    if (error.message === 'SCENARIO_NOT_FOUND') {
      return res.status(404).json(errorResponse('SCENARIO_NOT_FOUND', 'Scenario not found'));
    }
    if (error.message === 'CHOICE_NOT_FOUND') {
      return res.status(400).json(errorResponse('CHOICE_NOT_FOUND', 'Invalid choice'));
    }
    res.status(500).json(errorResponse('EVALUATION_FAILED', error.message));
  }
});

router.get('/history', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    
    const history = await decisionService.getDecisionHistory(userId, limit);
    res.json(successResponse(history));
  } catch (error: any) {
    res.status(500).json(errorResponse('FETCH_FAILED', error.message));
  }
});

router.get('/peer-stats/:scenarioId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { scenarioId } = req.params;
    const stats = await decisionService.getPeerStatistics(scenarioId);
    res.json(successResponse(stats));
  } catch (error: any) {
    res.status(500).json(errorResponse('FETCH_FAILED', error.message));
  }
});

export default router;

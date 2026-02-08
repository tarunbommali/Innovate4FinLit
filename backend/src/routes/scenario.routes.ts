import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import scenarioService from '../services/scenario.service';
import { successResponse, errorResponse } from '../utils/response';

const router = Router();

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userGroup = req.query.userGroup as string || req.user!.userGroup;
    const theme = req.query.theme as string | undefined;
    
    const scenarios = await scenarioService.getScenarios(userGroup, theme);
    res.json(successResponse(scenarios));
  } catch (error: any) {
    res.status(500).json(errorResponse('FETCH_FAILED', error.message));
  }
});

router.get('/:scenarioId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { scenarioId } = req.params;
    const scenario = await scenarioService.getScenarioById(scenarioId);
    res.json(successResponse(scenario));
  } catch (error: any) {
    if (error.message === 'SCENARIO_NOT_FOUND') {
      return res.status(404).json(errorResponse('SCENARIO_NOT_FOUND', 'Scenario not found'));
    }
    res.status(500).json(errorResponse('FETCH_FAILED', error.message));
  }
});

export default router;

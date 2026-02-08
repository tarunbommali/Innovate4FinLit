import { Router } from 'express';
import authService from '../services/auth.service';
import { successResponse, errorResponse } from '../utils/response';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, userGroup, language } = req.body;

    if (!name || !email || !password || !userGroup) {
      return res.status(400).json(errorResponse('MISSING_FIELDS', 'Name, email, password, and userGroup are required'));
    }

    if (!['Student', 'Young_Adult'].includes(userGroup)) {
      return res.status(400).json(errorResponse('INVALID_USER_GROUP', 'User group must be Student or Young_Adult'));
    }

    const result = await authService.register({ name, email, password, userGroup, language });
    res.status(201).json(successResponse(result));
  } catch (error: any) {
    if (error.message === 'EMAIL_EXISTS') {
      return res.status(409).json(errorResponse('EMAIL_EXISTS', 'Email already registered'));
    }
    res.status(500).json(errorResponse('REGISTRATION_FAILED', error.message));
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(errorResponse('MISSING_FIELDS', 'Email and password are required'));
    }

    const result = await authService.login({ email, password });
    res.json(successResponse(result));
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json(errorResponse('INVALID_CREDENTIALS', 'Invalid email or password'));
    }
    res.status(500).json(errorResponse('LOGIN_FAILED', error.message));
  }
});

router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(errorResponse('MISSING_TOKEN', 'Authorization token is required'));
    }

    const token = authHeader.substring(7);
    const payload = authService.verifyToken(token);
    res.json(successResponse({ valid: true, payload }));
  } catch (error) {
    res.status(401).json(errorResponse('INVALID_TOKEN', 'Invalid or expired token'));
  }
});

export default router;

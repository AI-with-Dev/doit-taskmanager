import { Request, Response, NextFunction } from 'express';
import { getSupabaseClient } from '../lib/supabase';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const isMockMode = process.env.USE_MOCK_DATA === 'true' || !process.env.SUPABASE_URL || process.env.SUPABASE_URL.includes('placeholder');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    if (isMockMode) {
      // Allow demo user in mock mode for instant developer onboarding
      req.user = { id: 'demo-user-123', email: 'demo@doit.local' };
      next();
      return;
    }
    res.status(401).json({
      success: false,
      error: 'Missing or malformed Authorization header. Expected Bearer <token>',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  // If testing with mock token or in mock mode
  if (isMockMode && (token === 'mock-token' || token === 'demo-token' || token.startsWith('demo-'))) {
    req.user = { id: 'demo-user-123', email: 'demo@doit.local' };
    next();
    return;
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      if (isMockMode) {
        req.user = { id: 'demo-user-123', email: 'demo@doit.local' };
        next();
        return;
      }
      res.status(401).json({
        success: false,
        error: 'Invalid or expired session token. Please log in again.',
      });
      return;
    }

    req.user = {
      id: data.user.id,
      email: data.user.email,
    };
    next();
  } catch (err: any) {
    if (isMockMode) {
      req.user = { id: 'demo-user-123', email: 'demo@doit.local' };
      next();
      return;
    }
    res.status(401).json({
      success: false,
      error: 'Authentication verification failed.',
    });
  }
};

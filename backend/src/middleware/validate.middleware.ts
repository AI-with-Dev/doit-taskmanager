import { Request, Response, NextFunction } from 'express';

const VALID_PRIORITIES = ['low', 'medium', 'high'];
const VALID_STATUSES = ['pending', 'completed'];

export const validateCreateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, priority, category, due_date } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    res.status(400).json({
      success: false,
      error: 'Task title is required and cannot be empty.',
    });
    return;
  }

  if (title.trim().length > 255) {
    res.status(400).json({
      success: false,
      error: 'Task title cannot exceed 255 characters.',
    });
    return;
  }

  if (priority && !VALID_PRIORITIES.includes(priority)) {
    res.status(400).json({
      success: false,
      error: `Invalid priority. Allowed values: ${VALID_PRIORITIES.join(', ')}`,
    });
    return;
  }

  if (category && typeof category !== 'string') {
    res.status(400).json({
      success: false,
      error: 'Category must be a string.',
    });
    return;
  }

  if (due_date && isNaN(Date.parse(due_date))) {
    res.status(400).json({
      success: false,
      error: 'Invalid due date format. Expected valid ISO date string.',
    });
    return;
  }

  next();
};

export const validateUpdateTask = (req: Request, res: Response, next: NextFunction): void => {
  const { title, priority, status, due_date, category } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Task title cannot be empty.',
      });
      return;
    }
    if (title.trim().length > 255) {
      res.status(400).json({
        success: false,
        error: 'Task title cannot exceed 255 characters.',
      });
      return;
    }
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    res.status(400).json({
      success: false,
      error: `Invalid status. Allowed values: ${VALID_STATUSES.join(', ')}`,
    });
    return;
  }

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    res.status(400).json({
      success: false,
      error: `Invalid priority. Allowed values: ${VALID_PRIORITIES.join(', ')}`,
    });
    return;
  }

  if (category !== undefined && typeof category !== 'string') {
    res.status(400).json({
      success: false,
      error: 'Category must be a string.',
    });
    return;
  }

  if (due_date !== undefined && due_date !== null && isNaN(Date.parse(due_date))) {
    res.status(400).json({
      success: false,
      error: 'Invalid due date format. Expected valid ISO date string or null.',
    });
    return;
  }

  next();
};

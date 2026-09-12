import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validateCreateTask, validateUpdateTask } from '../middleware/validate.middleware';

const router = Router();

// All task routes require authentication
router.use(requireAuth);

// 1. Productivity Summary (MUST be declared before /:id to prevent matching 'summary' as an ID parameter)
router.get('/summary', TaskController.getSummary);

// 2. Task Collection endpoints
router.get('/', TaskController.getTasks);
router.post('/', validateCreateTask, TaskController.createTask);

// 3. Individual Task endpoints
router.get('/:id', TaskController.getTaskById);
router.patch('/:id', validateUpdateTask, TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;

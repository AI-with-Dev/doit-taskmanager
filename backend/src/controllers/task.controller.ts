import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { TaskFilters } from '../types/task.types';

export class TaskController {
  // GET /api/tasks
  static async getTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const filters: TaskFilters = {
        status: req.query.status as any,
        priority: req.query.priority as any,
        category: req.query.category as string,
        search: req.query.search as string,
      };

      const tasks = await TaskService.getTasks(userId, filters);
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/tasks/:id
  static async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const task = await TaskService.getTaskById(userId, id);
      if (!task) {
        res.status(404).json({
          success: false,
          error: `Task with id '${id}' not found.`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/tasks
  static async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const task = await TaskService.createTask(userId, req.body);

      res.status(201).json({
        success: true,
        message: 'Task created successfully.',
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/tasks/:id
  static async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const updated = await TaskService.updateTask(userId, id, req.body);
      if (!updated) {
        res.status(404).json({
          success: false,
          error: `Task with id '${id}' not found.`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Task updated successfully.',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/tasks/:id
  static async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const deleted = await TaskService.deleteTask(userId, id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          error: `Task with id '${id}' not found.`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/tasks/summary
  static async getSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const summary = await TaskService.getSummary(userId);

      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
}

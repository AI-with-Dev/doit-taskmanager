import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

// Enable Cross-Origin Resource Sharing (CORS) with support for Vercel production domains
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, curl, or mobile requests with no origin
      if (!origin) return callback(null, true);
      // Allow configured domains, any Vercel deployment (*.vercel.app), or local dev
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Root welcome route for browser exploration
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: '⚡️ DO.IT Task Manager REST API Server is running!',
    status: 'online',
    version: '1.0.0',
    mode: process.env.USE_MOCK_DATA === 'true' ? 'mock-demo' : 'supabase-production',
    endpoints: {
      health: '/health',
      tasks: '/api/tasks',
      summary: '/api/tasks/summary',
    },
    frontendUrl: 'http://localhost:3000',
    note: 'To use the web application with the visual user interface, open http://localhost:3000 in your browser.',
  });
});

// Health check endpoint for uptime monitoring
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mode: process.env.USE_MOCK_DATA === 'true' ? 'mock-demo' : 'supabase-production',
  });
});

// API Routes
app.use('/api/tasks', taskRoutes);

// Catch-all for unhandled routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Endpoint '${req.method} ${req.originalUrl}' not found on DO.IT API server.`,
  });
});

// Centralized error handling middleware
app.use(errorHandler);

export default app;

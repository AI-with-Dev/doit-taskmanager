import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`⚡️ [DO.IT Backend] Server is running at http://localhost:${PORT}`);
  console.log(`📡 Health check available at http://localhost:${PORT}/health`);
  console.log(`📋 Tasks API available at http://localhost:${PORT}/api/tasks`);
  console.log(`🎯 Mode: ${process.env.USE_MOCK_DATA === 'true' ? 'MOCK / DEMO' : 'SUPABASE PRODUCTION'}`);
});

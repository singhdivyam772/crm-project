import 'dotenv/config';
import app from './app.js';
import prisma from './lib/prisma.js';

const PORT = process.env.PORT || 5000;

try {
  await prisma.$connect();
  console.log('MySQL connected via Prisma');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
  console.error('DB connection failed:', err.message);
  process.exit(1);
}

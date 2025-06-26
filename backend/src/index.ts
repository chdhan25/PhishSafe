import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req: Request, res: Response) => {
  res.send('Backend is working 🚀');
});

// ✅ Track email clicks via GET
app.get('/api/log-event', async (req: Request, res: Response): Promise<any> => {
  const { email, type = 'click' } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid email' });
  }

  try {
    const event = await prisma.emailEvent.create({
      data: {
        email,
        type: String(type),
      },
    });

    console.log(`✅ Event logged: ${email} - ${type}`);
    // Optional redirect after click
    res.redirect('https://clinicnotice.com/training');
  } catch (err) {
    console.error('❌ Failed to log event:', err);
    res.status(500).json({ error: 'Failed to log event' });
  }
});

// Optional: manual logging via POST
app.post('/api/log-event', async (req: Request, res: Response): Promise<any> => {
  const { email, type } = req.body;

  if (!email || !type) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const event = await prisma.emailEvent.create({
      data: { email, type },
    });
    res.status(200).json(event);
  } catch (err) {
    console.error('❌ Failed to log event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(Number(PORT), () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

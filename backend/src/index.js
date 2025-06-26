"use strict";
// backend/src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Test GET route
app.get('/api/test', (_req, res) => {
    res.send('GET route works!');
});
// POST route with proper typings
app.post('/api/log-event', async (req, res) => {
    const { email, type } = req.body;
    if (!email || !type) {
        return res.status(400).json({ error: 'Email and type are required' });
    }
    try {
        const event = await prisma.emailEvent.create({
            data: { email, type },
        });
        res.status(200).json(event);
    }
    catch (error) {
        console.error('Error logging event:', error);
        res.status(500).json({ error: 'Failed to log event' });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(Number(PORT), () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

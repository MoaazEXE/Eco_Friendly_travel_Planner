require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

const ecoOptionsRouter = require('./routes/ecoOptions');
// M1 (Moaaz) — wire in the auth router here once available:
// const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecoway')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ecoway-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// M1 auth routes (login, register, logout, /me)
// app.use('/api/auth', authRouter);

// M4 eco-options routes (favourites CRUD)
app.use('/api/eco-options', ecoOptionsRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

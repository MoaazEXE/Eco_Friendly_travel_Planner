const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// ── Middleware ────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public/ directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── Phase 2: API Routes ──────────────────────────────────
// TODO: Add authentication routes (login, register, logout)
// TODO: Add user profile routes
// TODO: Add eco-options routes
// TODO: Add itinerary routes
// TODO: Add weather API routes
// TODO: Add carbon calculator routes

// ── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Eco Travel Planner running at http://localhost:${PORT}`);
});

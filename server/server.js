// Liviu Radu, 041-290-873
// Assignment 3 - Express server
//
// Sets up the JSON middleware, serves the frontend from /public,
// and exposes one route: GET /foods.

const express = require('express');
const path = require('path');
const foodStore = require('./foodStore');

const app = express();

// Middleware: lets Express read JSON bodies (needed once we add POST/PUT later)
app.use(express.json());

// Log every request so we can see what is happening while debugging
app.use((req, res, next) => {
  console.log(`[Server] ${req.method} ${req.url}`);
  next();
});

// Serve the frontend files (public/index.html)
app.use(express.static(path.join(__dirname, '..', 'public')));

// GET /foods - return all food items as JSON
app.get('/foods', (req, res) => {
  try {
    const foods = foodStore.getAll();
    console.log(`[Server] Sending ${foods.length} foods with status 200`);
    res.status(200).json(foods);
  } catch (err) {
    console.error('[Server] Error in GET /foods:', err.message);
    res.status(500).json({ error: 'Something went wrong on the server' });
  }
});

// 404 handler: runs only if no route above matched
app.use((req, res) => {
  console.log(`[Server] 404 - ${req.method} ${req.url} not found`);
  res.status(404).json({ error: 'Route not found' });
});

// Dynamic port: use the host's port (Replit etc.), or 3000 on my computer
const PORT = process.env.PORT || 3000;

// Only start listening when run directly (node server/server.js).
// When the tests require this file, we skip listen() so supertest can run it.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Server] Running on port ${PORT}`);
  });
}

// Export the app so the tests can use it
module.exports = app;

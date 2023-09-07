const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
// const authMiddleware = require('./middleware/authentication');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const http = require('http');
const app = express();
const initializeLiveAttendance = require('./config/websocket');
const server = http.createServer(app);

initializeLiveAttendance(server);


const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());

// Middleware for authentication (protect specific routes)
// app.use('/api/secure', authMiddleware);

// API routes

app.use('/api', apiRoutes);

// Authentication routes
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Import required modules
const Express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

if (process.env.NODE_ENV !== 'test') {
  require('./utils/utils');
}

// Create the new Express app
const app = Express();

// Import the routes
const teamRoutes = require('./routes/teamRoutes');
const authRoutes = require('./routes/authenticationRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const fileRoutes = require('./routes/fileRoutes');

// Set up middleware to parse JSON, URL-encoded bodies and cookies
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set the CORS header
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE',
  preflightContinue: true,
};

app.use(cors(corsOptions));

/**
 * Healthcheck
 * @route GET /api/ping
 * @desc Check if the server is running
 * @access Public
 * @returns {object} Returns a JSON object with a message property indicating the server is running
 */
app.get('/api/ping', (req, res) => {
  return res.status(200).json({ message: 'The server is running!' });
});

/**
 * Handle requests to /api/teams
 * @route /api/teams
 * @desc Route to handle team related requests
 * @access Public
 */
app.use('/api/teams', teamRoutes);

/**
 * Handle the requests to /api/auth
 * @route /api/auth
 * @desc Route to handle authentication related requests
 * @access Public
 */
app.use('/api/auth', authRoutes);

/**
 * Handle the requests to /api/contributions
 * @route /api/contributions
 * @desc Route to handle contributions related requests
 * @access Public
 */
app.use('/api/contributions', contributionRoutes);

/**
 * Handle the requests to /api/submissions
 * @route /api/submissions
 * @desc Route to handle submissions related requests
 * @access Public
 */
app.use('/api/submissions', submissionRoutes);

/**
 * Handle the requests to /api/files
 * @route /api/files
 * @desc Route to handle files related requests
 * @access Public
 */
app.use('/api/files', fileRoutes);

/**
 * Handle errors
 * @route ALL *
 * @desc Handle all other routes and return a 404 error
 * @access Public
 * @returns {object} Returns a JSON object with an error property indicating the route was not found
 */
app.use('/', (req, res) => {
  return res.status(404).json({ error: `The requested route ${req.originalUrl} was not found` });
});

module.exports = app;

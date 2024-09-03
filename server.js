// Import dependencies
const path = require('path'); // Core Node.js module for handling file paths
const express = require('express'); // Express framework for building web applications
const session = require('express-session'); // Middleware for session handling
const SequelizeStore = require('express-session-sequelize')(session.Store); // Store sessions in a Sequelize database
const sequelize = require('./config/connection'); // Database connection configuration
const exphbs = require('express-handlebars'); // Templating engine for rendering HTML
const hbsHelpers = require('./utils/helpers'); // Custom Handlebars helpers

// Initialize app
const app = express(); // Create an instance of an Express application
const PORT = process.env.PORT || 3001; // Define the port the server will listen on

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET || 'default_secret', // Secret for signing the session ID cookie
  cookie: {}, // Configuration for cookies (can add options like maxAge, secure, etc.)
  resave: false, // Prevents session from being saved back to the store if it wasn't modified
  saveUninitialized: true, // Save new sessions that haven't been modified
  store: new SequelizeStore({
    db: sequelize, // Use Sequelize to store session data
  }),
};

// Use session middleware
app.use(session(sess)); // Integrates session handling into the Express app

// Set up Handlebars as the default template engine
const hbs = exphbs.create({ helpers: hbsHelpers }); // Initialize Handlebars with custom helpers
app.engine('handlebars', hbs.engine); // Register Handlebars as the view engine
app.set('view engine', 'handlebars'); // Set Handlebars as the default view engine

// Other middleware
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded requests (form data)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Routes
app.use(require('./controllers/')); // Use the routes defined in the 'controllers' directory

// Sync sequelize and start server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

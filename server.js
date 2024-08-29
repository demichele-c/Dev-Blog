const path = require("path"); // Provides utilities for working with file and directory paths
const express = require("express"); // Web framework for building server-side applications
const session = require("express-session"); // Middleware for managing sessions
const exphbs = require("express-handlebars"); // Handlebars view engine for rendering templates

// Create an instance of Express
const app = express(); // Initializes the Express application

// PORT variable for listener
const PORT = process.env.PORT || 3001; // Use the environment variable PORT or default to 3001

// Other imports
const sequelize = require("./config/connection"); // Import Sequelize instance for database connection
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Integrates Sequelize with session store

// Configuration for session management
const sess = {
  secret: process.env.SESSION_SECRET || 'default_secret', // Secret key for signing session cookies
  cookie: {}, // Session cookie settings (empty by default)
  resave: false, // Prevents session from being saved back to the store if unmodified
  saveUninitialized: true, // Save new sessions to the store
  store: new SequelizeStore({
    db: sequelize, // Use the Sequelize instance for storing session data
  }),
};

// Apply session middleware to Express
app.use(session(sess)); // Initializes and configures session handling

// Import custom helpers for Handlebars
const helpers = require("./utils/helpers"); // Custom helper functions for Handlebars templates

// Create a Handlebars instance with custom helpers
const hbs = exphbs.create({ helpers }); // Initialize Handlebars with custom helpers

// Set Handlebars as the default template engine
app.engine("handlebars", hbs.engine); // Register Handlebars engine
app.set("view engine", "handlebars"); // Set the default view engine to Handlebars

// Middleware configuration
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse incoming URL-encoded request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from 'public' directory

// Use routes defined in controllers
app.use(require("./controllers/")); // Mounts the routes defined in the controllers folder

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: true }).then(() => {
  // Start listening on the specified port
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

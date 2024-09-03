// Import the Router object from Express.js for handling routes
const router = require("express").Router();


// Import the routes for the API, home, and dashboard
const apiRoutes = require("./api/"); // Import API routes, usually containing endpoints for CRUD operations
const homeRoutes = require("./home-routes.js"); // Import routes for the home pages, including homepage, login, and signup
const dashboardRoutes = require("./dashboard-routes.js"); // Import routes for the user dashboard, including posts and post management


// Use homeRoutes for root-level routes, i.e., homepage, login, signup
router.use("/", homeRoutes);
// Use dashboardRoutes for all routes prefixed with '/dashboard'
router.use("/dashboard", dashboardRoutes);
// Use apiRoutes for all routes prefixed with '/api', such as API endpoints
router.use("/api", apiRoutes);

// Default response for any other request (404 Not Found)
router.use((req, res) => {
  // If none of the above routes are matched, send a 404 status
  res.status(404).end();
});

// Export routes to be used in the server
module.exports = router; // Makes the router available for import in other files

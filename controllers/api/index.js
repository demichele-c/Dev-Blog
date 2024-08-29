// Import the necessary modules and dependencies
const router = require("express").Router(); // Importing the Router object from Express.js to handle routes

// Import route modules for different functionalities
const userRoutes = require("./user-routes.js"); // Routes related to user operations
const postRoutes = require("./post-routes"); // Routes related to post operations
const commentRoutes = require("./comment-routes"); // Routes related to comment operations

// Set up middleware to use different route modules based on the URL path
router.use("/users", userRoutes); // Use userRoutes for any requests starting with '/users'
router.use("/posts", postRoutes); // Use postRoutes for any requests starting with '/posts'
router.use("/comments", commentRoutes); // Use commentRoutes for any requests starting with '/comments'

// Export the router so it can be used in other parts of the application
module.exports = router; // Makes the router available for import in other files
